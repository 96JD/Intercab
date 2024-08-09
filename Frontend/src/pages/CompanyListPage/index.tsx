import { Helmet } from "react-helmet-async";

import { companyApiSlice } from "../../reduxToolkit/api/apiSlices/companyApiSlice";
import Spinner from "../../shared/components/Loader/components/Spinner";
import PageHeader from "../../shared/components/PageHeader";
import CompanyList from "./components/CompanyList";

export default function CompanyListPage() {
	const { isLoading: loadingAllCompanies } = companyApiSlice.useFetchAllCompaniesQuery();
	return (
		<>
			<Helmet>
				<title>Company List</title>
			</Helmet>
			<PageHeader title="Companies" />
			{loadingAllCompanies ? <Spinner /> : <CompanyList />}
		</>
	);
}
