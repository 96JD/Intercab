import _ from "lodash";

import { tripApiSlice } from "../../../reduxToolkit/api/apiSlices/tripApiSlice";

const TRIP_TABLE_COLUMN_NAMES = ["License Number", "Car Number", "Price", "Date", "Report"];

export default function TripListTableHeader() {
	const { data: tripResponse } = tripApiSlice.useFetchAllTripsQuery();
	return (
		<thead className="bg-gray-50">
			<tr className="text-left">
				{!_.isEmpty(tripResponse?.allTrips) &&
					_.map(TRIP_TABLE_COLUMN_NAMES, (name) => (
						<th className="whitespace-nowrap p-5 text-sm text-gray-500" scope="col" key={name}>
							{name}
						</th>
					))}
			</tr>
		</thead>
	);
}
