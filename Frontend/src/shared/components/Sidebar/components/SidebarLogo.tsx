import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../../../AppRoutes";

export default function SidebarLogo() {
	const navigate = useNavigate();

	const imgSrc = "/assets/images/logo.png";

	const onLogoClick = useCallback(() => {
		navigate(APP_ROUTES.UPLOAD_REPORTS);
	}, [navigate]);

	return (
		<button
			className="flex flex-shrink-0 cursor-pointer items-center p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
			onClick={onLogoClick}
		>
			<img className="h-10 w-56" src={imgSrc} alt={imgSrc} />
		</button>
	);
}
