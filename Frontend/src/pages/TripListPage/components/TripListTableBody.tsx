import _ from "lodash";

import { tripApiSlice } from "../../../reduxToolkit/api/apiSlices/tripApiSlice";
import TripItem from "./TripItem";

export default function TripListTableBody() {
	const { data: tripResponse } = tripApiSlice.useFetchAllTripsQuery();
	return (
		<tbody className="divide-y divide-gray-200 bg-white">
			{_.map(tripResponse?.allTrips, (trip) => (
				<TripItem key={trip.id} trip={trip} />
			))}
		</tbody>
	);
}
