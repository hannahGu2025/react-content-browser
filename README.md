# Project Overview

This project is a React + TypeScript + Redux Toolkit content browser supporting debounced search, pricing filters, infinite-scroll pagination, and a content-detail modal. The codebase is organized by feature for clarity and maintainability.

---

## Table of contents
- [Main features](#main-features)  
- [Strengths / Highlights](#strengths--highlights)  
- [Areas to improve](#areas-to-improve)  
- [Quick actionable fixes](#quick-actionable-fixes)  
- [How to run / check locally](#how-to-run--check-locally)

---

## Main features
- Debounced keyword search — `src/hooks/useDebouncedSearch.ts` + `components/SearchBar`  
- Pricing filter — `components/ContentFilter` + `store/slices/contentSlice.ts`  
- Infinite scrolling pagination — `components/ContentList` + `fetchContent` thunk + `IntersectionObserver`  
- Content cards & detail modal — `components/ContentCard`, `components/ContentModal`  
- Global state — Redux Toolkit (`store/store.ts`, `store/slices/*`)  
- URL ↔ filter sync — `hooks/useFilterUrlSync.ts`  
- Styling — SCSS (`styles/global.scss` and per-component `.scss`)

---

## Strengths / Highlights
- Clear, feature-oriented folder structure (components, hooks, store, api, types).  
- Modern, typed stack: TypeScript + Redux Toolkit + hooks for safer, concise code.  
- UX-minded details: debounced search and URL sync improve responsiveness and shareability.  
- Robust async pattern: `createAsyncThunk` + lazy-loading via `IntersectionObserver`.  
- Reusable components (cards, filters, modal) enabling easy extension.
---

## Shortcoming 
- The API is unclear — I guessed it uses page and pageSize parameters; those don't seem to take effect, but it doesn't affect the frontend. This can be improved later.