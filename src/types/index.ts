export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}
export interface ContentItem {
  creator: string;
    id: string;
    imagePath: string;
    price: number;
    pricingOption: PricingOption;
    title: string;
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
