import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface InitialState {
	showSidebarSmallScreenView: boolean;
	selectedCompanyId: number;
}

const initialState: InitialState = {
	showSidebarSmallScreenView: false,
	selectedCompanyId: 0
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setShowSidebarSmallScreenView: (state, action: PayloadAction<boolean>) => {
			state.showSidebarSmallScreenView = action.payload;
		},
		setSelectedCompanyId: (state, action: PayloadAction<number>) => {
			state.selectedCompanyId = action.payload;
		}
	}
});

export const globalSliceReducer = globalSlice.reducer;

export const globalSliceActions = globalSlice.actions;

export const globalSliceSelectors = {
	showSidebarSmallScreenView: (state: RootState) => state.global.showSidebarSmallScreenView,
	selectedCompanyId: (state: RootState) => state.global.selectedCompanyId
};
