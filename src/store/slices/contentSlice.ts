import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentItem {
    id: number;
    title: string;
    description: string;
    price: number;
    imagePath: string;
}
//  {
//             "itemId": "ff1905c30a8c4690b7787f46424e9870",
//             "imagePath": "https://storagefiles.clo-set.com/public/marketplace/202510/ff1905c30a8c4690b7787f46424e9870/1/thumbnail/main_c1.png",
//             "index": 1,
//             "name": "Monster Slayer Jacket",
//             "prices": [
//                 {
//                     "licenseType": 0,
//                     "price": 12.00
//                 },
//                 {
//                     "licenseType": 1,
//                     "price": 36.00
//                 }
//             ],
//             "basePrice": 12.00,
//             "viewCount": 162,
//             "likeCount": 57,
//             "downloadCount": 0,
//             "hasLikeBefore": false,
//             "fileName": "main-c.zprj",
//             "fileSize": 508528797,
//             "pricingType": 0,
//             "itemDetailUrl": "https://connect.clo-set.com/detail/ff1905c30a8c4690b7787f46424e9870",
//             "downloadApiUrl": "https://connect.clo-set.com/api/pcs/Items/ff1905c30a8c4690b7787f46424e9870/versions/1/downloadUrl?api-version=2",
//             "userId": 317243,
//             "creator": "fateme_shamloo",
//             "creatorImagePath": "https://storagefiles.clo-set.com/public/Images/Pcs/Profile/317243/20230219083053e0b9351e594ff19deb8f31831b50afphoto.jpg"
//         }

interface ContentState {
    items: ContentItem[];
    filteredItems: ContentItem[];
    searchKeyword: string;
    currentPage: number;
    itemsPerPage: number;
}

const initialState: ContentState = {
    items: [],
    filteredItems: [],
    searchKeyword: '',
    currentPage: 1,
    itemsPerPage: 10,
};

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
            state.searchKeyword = action.payload;
            const keyword = action.payload.toLowerCase();
            state.filteredItems = state.items.filter(item =>
                item.title.toLowerCase().includes(keyword)
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
        // new: setPriceFilter accepts 'all' | 'low' | 'medium' | 'high'
        setPriceFilter(state, action: PayloadAction<string>) {
            const range = action.payload;
            const keyword = state.searchKeyword.toLowerCase();

            state.filteredItems = state.items.filter(item => {
                // apply keyword filter if present
                if (keyword && !item.title.toLowerCase().includes(keyword)) {
                    return false;
                }

                if (range === 'all') return true;
                if (range === 'low') return item.price < 50;
                if (range === 'medium') return item.price >= 50 && item.price <= 200;
                if (range === 'high') return item.price > 200;

                // unknown range -> don't filter by price
                return true;
            });

            // reset to first page when applying a new filter
            state.currentPage = 1;
        },
    },
});

export const {
    setItems,
    filterByKeyword,
    setSearchTerm,
    resetFilter,
    resetFilters,
    setCurrentPage,
    setPriceFilter,
} = contentSlice.actions;

export default contentSlice.reducer;
