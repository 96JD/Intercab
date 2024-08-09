import { Helmet } from "react-helmet-async";

import { tripApiSlice } from "../../reduxToolkit/api/apiSlices/tripApiSlice";
import Spinner from "../../shared/components/Loader/components/Spinner";
import PageHeader from "../../shared/components/PageHeader";
import TripList from "./components/TripList";

export default function TripListPage() {
	const { isLoading: loadingAllTrips } = tripApiSlice.useFetchAllTripsQuery();
	return (
		<>
			<Helmet>
				<title>Trip List</title>
			</Helmet>
			<PageHeader title="Trips" />
			{loadingAllTrips ? <Spinner /> : <TripList />}
		</>
	);
}
