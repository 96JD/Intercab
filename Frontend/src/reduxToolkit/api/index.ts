import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BACKEND_API_URL = import.meta.env.DEV
	? "https://localhost:7221"
	: "https://jacob-dolorzo-intercab.onrender.com";

const API_VERSION_1 = "api/v1";

export const API_URLS = {
	COMPANY: `${API_VERSION_1}/company`,
	REPORT: `${API_VERSION_1}/report`,
	TRIP: `${API_VERSION_1}/trip`
};

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
	endpoints: () => ({}),
	tagTypes: ["Company", "Report", "Trip"]
});
