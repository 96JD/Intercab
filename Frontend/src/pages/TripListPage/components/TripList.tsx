import _ from "lodash";

import { tripApiSlice } from "../../../reduxToolkit/api/apiSlices/tripApiSlice";
import NoDataFound from "../../../shared/components/NoDataFound";
import TripListTableBody from "./TripListTableBody";
import TripListTableHeader from "./TripListTableHeader";
import TripListWrapper from "./TripListWrapper";

export default function TripList() {
	const { data: tripResponse } = tripApiSlice.useFetchAllTripsQuery();
	return _.isEmpty(tripResponse?.allTrips) ? (
		<NoDataFound data="Trips" />
	) : (
		<TripListWrapper>
			<table className="min-w-full divide-y divide-gray-300">
				<TripListTableHeader />
				<TripListTableBody />
			</table>
		</TripListWrapper>
	);
}
