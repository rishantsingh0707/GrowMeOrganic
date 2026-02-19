# Art Institute of Chicago – Artwork Data Table

## Overview

This project is a React + TypeScript application built using Vite.  
It displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with:

- Server-side pagination
- Persistent row selection
- Custom row selection panel
- No mass data storage
- No page prefetching

API Used:
https://api.artic.edu/api/v1/artworks?page=1

---

## Tech Stack

- React (Vite)
- TypeScript
- PrimeReact DataTable
- Fetch API

---

## Project Structure

src/
│
├── api/
│ └── artworks.ts # API fetching logic
│
├── components/
│ ├── ArtworkTable.tsx # Main DataTable logic
│ └── CustomSelectionOverlay.tsx
│
├── hooks/
│ └── useArtworks.ts # Server-side pagination logic
│
├── types/
│ └── artwork.ts # TypeScript interfaces
│
├── App.tsx
└── main.tsx


---

## Features Implemented

### 1. Server-Side Pagination

- Data is fetched page-by-page.
- Only one API call is made per page change.
- No prefetching of additional pages.
- Data is always fetched fresh from the API.

Implementation:
- `lazy` mode in PrimeReact DataTable
- `onPage` event triggers new API call
- Current page stored in state

---

### 2. Persistent Row Selection

Selections persist when navigating between pages.

#### Strategy Used:

- Only artwork `id` values are stored.
- No row objects are stored.
- No data from other pages is cached.

State structure:

```ts
selectedIds: Set<number>
deselectedIds: Set<number>
When a page loads:

Current page rows are filtered

If row.id exists in selectedIds and not in deselectedIds → it appears selected

This ensures:

No memory overload

No page prefetching

No mass data storage

Selection remains persistent

3. Custom Row Selection
An overlay allows selecting n rows.

Rules followed:

Only selects rows from the current page

Does NOT fetch other pages

If n > rows on page → only available rows are selected

No while loops

No multiple API calls

4. Required Fields Displayed
The table displays:

title

place_of_origin

artist_display

inscriptions

date_start

date_end

Important Constraints Followed
No mass storage of API data

No prefetching of additional pages

No storing full row objects

Always fetch from API per page

Only store IDs for persistent selection

How to Run Locally
npm install
npm run dev
Deployment
Deployed on:

https://grow-me-organic-ruddy.vercel.app


Author
Rishant Singh
