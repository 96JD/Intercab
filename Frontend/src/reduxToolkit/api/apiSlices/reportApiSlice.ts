/* eslint-disable @typescript-eslint/no-invalid-void-type */
import _ from "lodash";

import { API_URLS, apiSlice } from "../";
import { AppToaster } from "../../../AppToaster";
import { Report } from "../../../models/Report";

interface AllReportsResponse {
	allReports: Report[];
}

interface UploadReportResponse {
	uploadedReports: Report[];
}

export const reportApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllReports: builder.query<AllReportsResponse, void>({
			query: () => `${API_URLS.REPORT}/fetch-all-reports`,
			providesTags: (result) =>
				result
					? [
							...result.allReports.map(({ id }) => ({
								type: "Report" as const,
								id
							})),
							{ type: "Report", id: "LIST" }
						]
					: [{ type: "Report", id: "LIST" }]
		}),
		uploadReports: builder.mutation<UploadReportResponse, FormData>({
			query: (formData: FormData) => ({
				url: `${API_URLS.REPORT}/upload-reports`,
				method: "POST",
				body: formData
			}),
			transformResponse: (uploadReportResponse: UploadReportResponse) => {
				const reportLabel = _.size(uploadReportResponse.uploadedReports) > 1 ? "Reports" : "Report";
				AppToaster.success(`${reportLabel} uploaded successfully.`);
				return uploadReportResponse;
			},
			invalidatesTags: () => [{ type: "Report" }]
		})
	})
});
