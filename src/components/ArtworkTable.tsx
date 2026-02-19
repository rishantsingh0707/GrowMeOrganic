import { useMemo, useState } from 'react';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useArtworks } from '../hooks/useArtworks';
import CustomSelectionOverlay from './CustomSelectionOverlay';
import type { Artwork } from '../types/artwork';

const rowsPerPage = 12;

export const ArtworkTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Persistent selection using IDs only
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());

  const { artworks, loading, totalRecords } = useArtworks(currentPage);

  // Derive selected rows for current page
  const selectedRows = useMemo(() => {
    return artworks.filter(
      (art) => selectedIds.has(art.id) && !deselectedIds.has(art.id)
    );
  }, [artworks, selectedIds, deselectedIds]);

  // Handle checkbox selection from DataTable
  const onSelectionChange = (e: { value: Artwork[] }) => {
    const updatedSelected = new Set(selectedIds);
    const updatedDeselected = new Set(deselectedIds);

    artworks.forEach((art) => {
      const isSelected = e.value.some((row) => row.id === art.id);

      if (isSelected) {
        updatedSelected.add(art.id);
        updatedDeselected.delete(art.id);
      } else {
        if (updatedSelected.has(art.id)) {
          updatedSelected.delete(art.id);
          updatedDeselected.add(art.id);
        }
      }
    });

    setSelectedIds(updatedSelected);
    setDeselectedIds(updatedDeselected);
  };

  // Custom select (ONLY current page)
  const handleCustomSelect = (count: number) => {
    const rowsToSelect = artworks.slice(0, count);

    const updatedSelected = new Set(selectedIds);
    const updatedDeselected = new Set(deselectedIds);

    rowsToSelect.forEach((row) => {
      updatedSelected.add(row.id);
      updatedDeselected.delete(row.id);
    });

    setSelectedIds(updatedSelected);
    setDeselectedIds(updatedDeselected);
  };

  // Pagination handler
  const onPage = (event: DataTablePageEvent) => {
    const newPage = (event.page ?? 0) + 1; // PrimeReact is 0-based
    setCurrentPage(newPage);
  };

  return (
    <div>
      <CustomSelectionOverlay onSelect={handleCustomSelect} />

      <div style={{ marginBottom: '1rem' }}>
        <strong>Total records:</strong> {totalRecords}
      </div>

      <DataTable
        value={artworks}
        lazy
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        first={(currentPage - 1) * rowsPerPage}
        onPage={onPage}
        loading={loading}
        selection={selectedRows}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};
