import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiStateType } from '../../types/index_d';

const initialState: UiStateType = {
	isLight: true,
	isPageLoading: false,
    showStatusAlert: false
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setIsLight: (state, action: PayloadAction<{isLight: boolean}>) => {
            const {isLight} = action.payload
            state.isLight = isLight
        },
        setIsLoading: (state, action: PayloadAction<{isLoading: boolean}>) => {
            const {isLoading} = action.payload
            state.isPageLoading = isLoading
        },
        setShowStatusAlert: (state, action: PayloadAction<{showStatusAlert: boolean}>) => {
            const {showStatusAlert} = action.payload
            state.showStatusAlert = showStatusAlert
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer