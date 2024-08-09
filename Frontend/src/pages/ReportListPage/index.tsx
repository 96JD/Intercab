import { Helmet } from "react-helmet-async";

import { reportApiSlice } from "../../reduxToolkit/api/apiSlices/reportApiSlice";
import Spinner from "../../shared/components/Loader/components/Spinner";
import PageHeader from "../../shared/components/PageHeader";
import ReportList from "./components/ReportList";

export default function ReportListPage() {
	const { isLoading: loadingAllReports } = reportApiSlice.useFetchAllReportsQuery();
	return (
		<>
			<Helmet>
				<title>Report List</title>
			</Helmet>
			<PageHeader title="Reports" />
			{loadingAllReports ? <Spinner /> : <ReportList />}
		</>
	);
}
