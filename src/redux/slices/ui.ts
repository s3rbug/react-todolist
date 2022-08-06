import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiStateType } from '../../types/index_d';

const initialState: UiStateType = {
	isLight: true,
	isPageLoading: false,
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
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer