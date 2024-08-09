import { clsx } from "clsx";
import { Fragment, ReactNode } from "react";

import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Spinner from "../Loader/components/Spinner";

interface Props {
	label: string;
	selectedOption?: string;
	onClick: () => void;
	loadingOptions: boolean;
	children: ReactNode;
}

export default function Select({ label, selectedOption, onClick, loadingOptions, children }: Readonly<Props>) {
	return (
		<Menu as="div" className="relative inline-block w-full">
			<label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
			<MenuButton
				className={clsx(
					selectedOption ? "justify-between" : "justify-end",
					"mt-2 flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				)}
				aria-label={label}
				onClick={onClick}
			>
				{selectedOption}
				<ChevronDownIcon className="h-5 w-5 text-gray-400" />
			</MenuButton>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">{loadingOptions ? <Spinner /> : children}</div>
				</MenuItems>
			</Transition>
		</Menu>
	);
}
