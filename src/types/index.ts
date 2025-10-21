export interface ContentItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface SearchQuery {
  keyword: string;
  filter: FilterOptions;
}