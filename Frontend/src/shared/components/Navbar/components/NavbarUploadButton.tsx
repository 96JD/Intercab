import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

import { APP_ROUTES } from "../../../../AppRoutes";
import { NAVBAR_CONSTANTS } from "../constants";

export default function NavbarUploadButton() {
	const navigate = useNavigate();

	const onUploadButtonClick = useCallback(() => {
		navigate(APP_ROUTES.UPLOAD_REPORTS);
	}, [navigate]);

	return (
		<button
			className="animate-bounce p-2.5 text-gray-700 transition hover:text-teal-500"
			title={NAVBAR_CONSTANTS.NAVBAR_TABS.UPLOAD_REPORTS}
			onClick={onUploadButtonClick}
		>
			<span className="sr-only">{APP_ROUTES.UPLOAD_REPORTS}</span>
			<ArrowUpOnSquareIcon className="h-6 w-6" />
		</button>
	);
}
