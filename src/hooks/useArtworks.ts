import { useEffect, useState } from 'react';
import type { Artwork } from '../types/artwork';
import { fetchArtworks } from '../api/artworks';

export const useArtworks = (page: number) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchArtworks(page);
        setArtworks(data.data);
        setTotalRecords(data.pagination.total);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page]);

  return { artworks, loading, totalRecords };
};
