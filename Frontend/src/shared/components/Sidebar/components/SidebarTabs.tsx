import _ from "lodash";

import { BuildingOfficeIcon, CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

import { APP_ROUTES } from "../../../../AppRoutes";
import { SIDEBAR_CONSTANTS } from "../constants";
import SidebarTab from "./SidebarTab";

export default function SidebarTabs() {
	const sidebarTabs = [
		{
			icon: BuildingOfficeIcon,
			name: SIDEBAR_CONSTANTS.SIDEBAR_TABS.COMPANIES,
			path: APP_ROUTES.COMPANY_LIST
		},
		{
			icon: DocumentTextIcon,
			name: SIDEBAR_CONSTANTS.SIDEBAR_TABS.REPORTS,
			path: APP_ROUTES.REPORT_LIST
		},
		{
			icon: CalendarDaysIcon,
			name: SIDEBAR_CONSTANTS.SIDEBAR_TABS.TRIPS,
			path: APP_ROUTES.TRIP_LIST
		}
	];

	return (
		<ul className="space-y-1">
			{_.map(sidebarTabs, (tab) => (
				<SidebarTab key={tab.name} tab={tab} />
			))}
		</ul>
	);
}
