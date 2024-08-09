import _ from "lodash";

import { reportApiSlice } from "../../../reduxToolkit/api/apiSlices/reportApiSlice";
import NoDataFound from "../../../shared/components/NoDataFound";
import ReportItem from "./ReportItem";

export default function ReportList() {
	const { data: reportResponse } = reportApiSlice.useFetchAllReportsQuery();
	return _.isEmpty(reportResponse?.allReports) ? (
		<NoDataFound data="Reports" />
	) : (
		<ul className="divide-y divide-gray-100 p-5">
			{_.map(reportResponse?.allReports, (report) => (
				<ReportItem key={report.id} report={report} />
			))}
		</ul>
	);
}
