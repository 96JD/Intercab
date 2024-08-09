import _ from "lodash";

import { companyApiSlice } from "../../../reduxToolkit/api/apiSlices/companyApiSlice";
import NoDataFound from "../../../shared/components/NoDataFound";
import CompanyItem from "./CompanyItem";

export default function CompanyList() {
	const { data: companyResponse } = companyApiSlice.useFetchAllCompaniesQuery();
	return _.isEmpty(companyResponse?.allCompanies) ? (
		<NoDataFound data="Companies" />
	) : (
		<ul className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
			{_.map(companyResponse?.allCompanies, (company) => (
				<CompanyItem key={company.id} company={company} />
			))}
		</ul>
	);
}
