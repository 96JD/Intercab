/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { API_URLS, apiSlice } from "../";
import { Company } from "../../../models/Company";

interface AllCompaniesResponse {
	allCompanies: Company[];
}

export const companyApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllCompanies: builder.query<AllCompaniesResponse, void>({
			query: () => `${API_URLS.COMPANY}/fetch-all-companies`,
			providesTags: (result) =>
				result
					? [
							...result.allCompanies.map(({ id }) => ({
								type: "Company" as const,
								id
							})),
							{ type: "Company", id: "LIST" }
						]
					: [{ type: "Company", id: "LIST" }]
		})
	})
});
