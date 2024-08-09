import { addParamToUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { useCallback, useState } from "react";

import { MenuItem } from "@headlessui/react";

import { APP_URL_PARAMS } from "../../../AppUrlParams";
import { companyApiSlice } from "../../../reduxToolkit/api/apiSlices/companyApiSlice";
import { globalSliceActions, globalSliceSelectors } from "../../../reduxToolkit/globalSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/store";
import Select from "../../../shared/components/Select";

export default function UploadReportsCompanyDropdown() {
	const dispatch = useAppDispatch();

	const selectedCompanyId = useAppSelector(globalSliceSelectors.selectedCompanyId);

	const [openCompanyDropdown, setOpenCompanyDropdown] = useState<boolean>(false);

	const { isLoading: loadingAllCompanies, data: companyResponse } = companyApiSlice.useFetchAllCompaniesQuery();

	const selectedCompanyName = _.find(companyResponse?.allCompanies, (c) => c.id === selectedCompanyId)?.name;

	const toggleCompanyDropdown = useCallback(() => {
		setOpenCompanyDropdown(!openCompanyDropdown);
	}, [openCompanyDropdown]);

	const onCompanyClick = useCallback(
		(companyId: number) => {
			dispatch(globalSliceActions.setSelectedCompanyId(companyId));
			addParamToUrl(APP_URL_PARAMS.SELECTED_COMPANY_ID, _.toString(companyId));
		},
		[dispatch]
	);

	return (
		<Select
			label="Company"
			selectedOption={selectedCompanyName}
			onClick={toggleCompanyDropdown}
			loadingOptions={loadingAllCompanies}
		>
			{_.map(companyResponse?.allCompanies, (company) => (
				<MenuItem key={company.id}>
					<button
						className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
						onClick={() => {
							onCompanyClick(company.id);
						}}
					>
						{company.name}
					</button>
				</MenuItem>
			))}
		</Select>
	);
}
