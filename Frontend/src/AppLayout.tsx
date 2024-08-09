import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./shared/components/Navbar";
import Sidebar from "./shared/components/Sidebar";
import SidebarDrawer from "./shared/components/Sidebar/components/SidebarDrawer";

export default function AppLayout() {
	return (
		<>
			<Sidebar />
			<SidebarDrawer />
			<div className="lg:pl-72">
				<Navbar />
				<div className="mx-auto p-5">
					<div className="mx-auto flex min-h-full w-full max-w-[1200px] flex-1 flex-col justify-center rounded-lg bg-white shadow">
						<ToastContainer />
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
