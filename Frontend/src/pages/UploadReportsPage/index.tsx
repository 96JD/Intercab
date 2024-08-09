import { addParamToUrl, getParamFromUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { APP_URL_PARAMS } from "../../AppUrlParams";
import { reportApiSlice } from "../../reduxToolkit/api/apiSlices/reportApiSlice";
import { globalSliceActions, globalSliceSelectors } from "../../reduxToolkit/globalSlice";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/store";
import MainButton from "../../shared/components/MainButton";
import PageHeader from "../../shared/components/PageHeader";
import SecondaryButton from "../../shared/components/SecondaryButton";
import UploadReportsCompanyDropdown from "./components/UploadReportsCompanyDropdown";
import UploadReportsInput from "./components/UploadReportsInput";
import UploadReportsWrapper from "./components/UploadReportsWrapper";

export default function UploadReportsPage() {
	const dispatch = useAppDispatch();

	const [uploadReports, { isLoading: isUploadingReports }] = reportApiSlice.useUploadReportsMutation();

	const selectedCompanyId = useAppSelector(globalSliceSelectors.selectedCompanyId);

	const [uploadedReports, setUploadedReports] = useState<FileList>();

	useEffect(() => {
		const selectedCompanyIdParam = getParamFromUrl(APP_URL_PARAMS.SELECTED_COMPANY_ID);
		const emptySelectedCompanyIdParam = _.isNil(selectedCompanyIdParam);
		const emptySelectedCompanyIdState = selectedCompanyId === 0;
		if (!emptySelectedCompanyIdParam && emptySelectedCompanyIdState) {
			dispatch(globalSliceActions.setSelectedCompanyId(_.toNumber(selectedCompanyIdParam)));
			addParamToUrl(APP_URL_PARAMS.SELECTED_COMPANY_ID, selectedCompanyIdParam);
		} else if (
			(!emptySelectedCompanyIdParam && !emptySelectedCompanyIdState) ||
			(emptySelectedCompanyIdParam && !emptySelectedCompanyIdState)
		) {
			addParamToUrl(APP_URL_PARAMS.SELECTED_COMPANY_ID, _.toString(selectedCompanyId));
		}
	}, [dispatch, selectedCompanyId]);

	const updateUploadedReports = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles = e.target.files;
		if (uploadedFiles) {
			setUploadedReports(uploadedFiles);
		}
	}, []);

	const emptyUploadedReports = useCallback(() => {
		setUploadedReports(undefined);
	}, []);

	const sendReports = useCallback(() => {
		if (!_.isNil(uploadedReports)) {
			const formData = new FormData();
			formData.append("selectedCompanyId", _.toString(selectedCompanyId));
			for (let i = 0; i < uploadedReports.length; i++) {
				formData.append(`report-${_.toString(i)}`, uploadedReports[i]);
			}
			void uploadReports(formData);
			emptyUploadedReports();
		}
	}, [emptyUploadedReports, selectedCompanyId, uploadReports, uploadedReports]);

	return (
		<>
			<Helmet>
				<title>Upload Reports</title>
			</Helmet>
			<PageHeader title="Upload Reports" />
			<UploadReportsWrapper>
				<UploadReportsCompanyDropdown />
				<UploadReportsInput uploadedReports={uploadedReports} updateUploadedReports={updateUploadedReports} />
				<div className="flex items-center justify-center gap-x-6">
					<SecondaryButton label="Cancel" onClick={emptyUploadedReports} />
					<MainButton
						label={isUploadingReports ? "Sending" : "Send"}
						disabled={_.isNil(selectedCompanyId) || _.isEmpty(uploadedReports)}
						onClick={sendReports}
					/>
				</div>
			</UploadReportsWrapper>
		</>
	);
}
