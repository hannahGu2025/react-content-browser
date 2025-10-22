import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalContent {
  title?: string;
  description?: string;
  imagePath?: string;
  [key: string]: any;
}

interface UIState {
    loading: boolean;
    error: string | null;
    isOpen: boolean;
    content: ModalContent | null;
}

const initialState: UIState = {
    loading: false,
    error: null,
    isOpen: false,
    content: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        // 打开模态并可传入内容
        openModal(state, action: PayloadAction<ModalContent | null>) {
        state.isOpen = true;
        state.content = action.payload;
        },
        // 关闭模态（ContentModal 中使用的 action）
        closeModal(state) {
        state.isOpen = false;
        state.content = null;
        },
        setModalContent(state, action: PayloadAction<ModalContent | null>) {
        state.content = action.payload;
        },
    },
});

export const { setLoading, setError, clearError, openModal, closeModal, setModalContent } = uiSlice.actions;

export default uiSlice.reducer;