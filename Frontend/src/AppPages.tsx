import { lazy } from "react";

import { Loader } from "./shared/components/Loader";

export const CompanyListPage = Loader(lazy(() => import("./pages/CompanyListPage")));
export const ReportListPage = Loader(lazy(() => import("./pages/ReportListPage")));
export const TripListPage = Loader(lazy(() => import("./pages/TripListPage")));
export const UploadReportsPage = Loader(lazy(() => import("./pages/UploadReportsPage")));
