import { clsx } from "clsx";
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../Icon";
import { getCurrentTab } from "../functions";

interface Props {
	tab: {
		icon: ForwardRefExoticComponent<
			PropsWithoutRef<SVGProps<SVGSVGElement>> & {
				title?: string;
				titleId?: string;
			} & RefAttributes<SVGSVGElement>
		>;
		name: string;
		path: string;
	};
}

export default function SidebarTabs({ tab }: Readonly<Props>) {
	const navigate = useNavigate();

	const currentTab = getCurrentTab();

	const isTabActive = useCallback((path: string) => currentTab === path, [currentTab]);

	const onTabClick = useCallback(
		(path: string) => {
			navigate(path);
		},
		[navigate]
	);

	return (
		<li key={tab.name}>
			<button
				className={clsx(
					isTabActive(tab.path)
						? "bg-gray-50 text-emerald-600"
						: "text-gray-700 hover:bg-gray-50 hover:text-emerald-600",
					"group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
				)}
				onClick={() => {
					onTabClick(tab.path);
				}}
			>
				<span
					className={clsx(
						isTabActive(tab.path) ? "text-emerald-600" : "text-gray-400 group-hover:text-emerald-600",
						"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[0.625rem] font-medium"
					)}
				>
					<Icon
						component={tab.icon}
						classNames={clsx(
							isTabActive(tab.path) ? "text-emerald-600" : "text-gray-400 group-hover:text-emerald-600",
							"h-6 w-6 shrink-0"
						)}
					/>
				</span>
				<span className="truncate">{tab.name}</span>
			</button>
		</li>
	);
}
