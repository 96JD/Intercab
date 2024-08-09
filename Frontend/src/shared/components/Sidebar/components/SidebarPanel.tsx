import Divider from "../../Divider";
import SidebarLogo from "./SidebarLogo";
import SidebarTabs from "./SidebarTabs";

export default function SidebarPanel() {
	return (
		<div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white p-5">
			<SidebarLogo />
			<Divider />
			<nav className="flex flex-1 flex-col">
				<SidebarTabs />
			</nav>
		</div>
	);
}
