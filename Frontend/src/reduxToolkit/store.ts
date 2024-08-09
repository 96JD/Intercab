import { getErrorMessageByHttpStatus } from "96jd-error-handler-utils";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { combineReducers, configureStore, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

import { AppToaster } from "../AppToaster";
import { apiSlice } from "./api";
import { globalSliceReducer } from "./globalSlice";

interface ReduxAction {
	payload: {
		originalStatus: number;
	};
}

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	global: globalSliceReducer
});

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		AppToaster.error(getErrorMessageByHttpStatus((action as ReduxAction).payload.originalStatus));
	}
	return next(action);
};

export const reduxStore = configureStore({
	reducer: rootReducer,
	middleware: (gDM) => gDM().concat(apiSlice.middleware, rtkQueryErrorLogger),
	devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
