import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContent as fetchContentAPI } from 'api/contentService';

export enum PricingOption{
    PAID = 0,
    FREE = 1,
    VIEW_ONLY = 2,
}
interface ContentItem {
   creator: string;
  id: string;
  imagePath: string;
  price: number;
  pricingOption: PricingOption;
  title: string;
}


interface ContentState {
    items: ContentItem[];
    filteredItems: ContentItem[];
    searchKeyword: string;
    currentPage: number;
    itemsPerPage: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string | null;
    selectedPricingOptions: PricingOption[];
}

const initialState: ContentState = {
    items: [],
    filteredItems: [],
    searchKeyword: '',
    currentPage: 1,
    itemsPerPage: 10,
    status: 'idle',
    error: null,
    selectedPricingOptions: [],
};


export const fetchContent = createAsyncThunk(
    'content/fetch',
    async (params: { filters?: any; searchTerm?: string; page?: number; maxPrice?: number; minPrice?: number; pricingOptions?: PricingOption[] } = {}) => {
        const { filters = {}, searchTerm = '', page = 1, maxPrice = 999999999, minPrice = 0, pricingOptions = [] } = params;
        const data = await fetchContentAPI(filters, searchTerm, page);
        // 适配后端返回：若返回对象 { items: [...] } 则取 items，否则直接返回数组
        return Array.isArray(data) ? data : data?.items ?? [];
    }
);

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<ContentItem[]>) {
            state.items = action.payload;
            state.filteredItems = action.payload;
        },
        filterByKeyword(state, action: PayloadAction<string>) {
            state.searchKeyword = action.payload;
            const keyword = action.payload.toLowerCase();
            state.filteredItems = state.items.filter(item =>
                item.title.toLowerCase().includes(keyword)
            );
        },
         setSearchTerm(state, action: PayloadAction<string>) {
            console.log('Setting search term to:', action.payload);
            state.searchKeyword = action.payload;
            const keyword = action.payload.toLowerCase();
            state.filteredItems = state.items.filter(item =>
                item.title.toLowerCase().includes(keyword) || item.creator.toLowerCase().includes(keyword)
            );
            state.currentPage = 1;
        },
        // keep singular for backward compatibility
        resetFilter(state) {
            state.searchKeyword = '';
            state.filteredItems = state.items;
            state.currentPage = 1;
        },
        // new: resetFilters (plural) used by components
        resetFilters(state) {
            state.searchKeyword = '';
            state.filteredItems = state.items;
            state.currentPage = 1;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
         setPricingOptions(state, action: PayloadAction<number[]>) {
            state.selectedPricingOptions = action.payload;
            const keyword = state.searchKeyword.toLowerCase();

            state.filteredItems = state.items.filter(item => {
                // keyword filter
                if (keyword && !item.title.toLowerCase().includes(keyword)) {
                    return false;
                }
                // if no option selected, treat as show none -> but we prefer show all when empty selection? 
                // 这里遵循：空数组 => 不筛选（显示全部）
                if (action.payload.length === 0) return true;
                return action.payload.includes(item.pricingOption);
            });

            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchContent.fulfilled, (state, action: PayloadAction<ContentItem[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.filteredItems = action.payload;
            })
            .addCase(fetchContent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch content';
            });
    },
});

export const {
    setItems,
    filterByKeyword,
    setSearchTerm,
    resetFilter,
    resetFilters,
    setCurrentPage,
    setPricingOptions,
} = contentSlice.actions;

export default contentSlice.reducer;
