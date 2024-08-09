import { useCallback } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";

import { globalSliceActions } from "../../../../reduxToolkit/globalSlice";
import { useAppDispatch } from "../../../../reduxToolkit/store";

export default function NavbarMainMenuButton() {
	const dispatch = useAppDispatch();

	const openSidebarSmallScreenView = useCallback(() => {
		dispatch(globalSliceActions.setShowSidebarSmallScreenView(true));
	}, [dispatch]);

	return (
		<button className="p-2.5 text-gray-700 lg:hidden" onClick={openSidebarSmallScreenView}>
			<span className="sr-only">Open sidebar</span>
			<Bars3Icon className="h-6 w-6" />
		</button>
	);
}
