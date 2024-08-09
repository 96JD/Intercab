/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { API_URLS, apiSlice } from "../";
import { Trip } from "../../../models/Trip";

interface AllTripsResponse {
	allTrips: Trip[];
}

export const tripApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllTrips: builder.query<AllTripsResponse, void>({
			query: () => `${API_URLS.TRIP}/fetch-all-trips`,
			providesTags: (result) =>
				result
					? [
							...result.allTrips.map(({ id }) => ({
								type: "Trip" as const,
								id
							})),
							{ type: "Trip", id: "LIST" }
						]
					: [{ type: "Trip", id: "LIST" }]
		})
	})
});
