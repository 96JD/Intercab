import { useCallback } from "react";

import { globalSliceActions, globalSliceSelectors } from "../../../../reduxToolkit/globalSlice";
import { useAppDispatch, useAppSelector } from "../../../../reduxToolkit/store";
import Drawer from "../../Drawer";
import SidebarPanel from "./SidebarPanel";

export default function SidebarDrawer() {
	const dispatch = useAppDispatch();

	const showSidebarSmallScreenView = useAppSelector(globalSliceSelectors.showSidebarSmallScreenView);

	const closeSidebarSmallScreenView = useCallback(() => {
		dispatch(globalSliceActions.setShowSidebarSmallScreenView(false));
	}, [dispatch]);

	return (
		<Drawer show={showSidebarSmallScreenView} onClose={closeSidebarSmallScreenView}>
			<SidebarPanel />
		</Drawer>
	);
}
