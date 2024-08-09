import { Navigate, RouteObject } from "react-router-dom";

import AppLayout from "./AppLayout";
import CompanyListPage from "./pages/CompanyListPage";
import ReportListPage from "./pages/ReportListPage";
import TripListPage from "./pages/TripListPage";
import UploadReportsPage from "./pages/UploadReportsPage";

export const APP_ROUTES = {
	DEFAULT: "/",
	PAGE_NOT_FOUND: "*",
	UPLOAD_REPORTS: "upload-reports",
	COMPANY_LIST: "company-list",
	REPORT_LIST: "report-list",
	TRIP_LIST: "trip-list"
};

export const AppRoutes: RouteObject[] = [
	{
		path: APP_ROUTES.DEFAULT,
		element: <AppLayout />,
		children: [
			{
				path: APP_ROUTES.PAGE_NOT_FOUND,
				element: <Navigate to={APP_ROUTES.UPLOAD_REPORTS} replace />
			},
			{
				path: APP_ROUTES.DEFAULT,
				element: <Navigate to={APP_ROUTES.UPLOAD_REPORTS} replace />
			},
			{
				path: APP_ROUTES.COMPANY_LIST,
				element: <CompanyListPage />
			},
			{
				path: APP_ROUTES.REPORT_LIST,
				element: <ReportListPage />
			},
			{
				path: APP_ROUTES.TRIP_LIST,
				element: <TripListPage />
			},
			{
				path: APP_ROUTES.UPLOAD_REPORTS,
				element: <UploadReportsPage />
			}
		]
	}
];
