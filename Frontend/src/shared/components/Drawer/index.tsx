import { Fragment, ReactNode } from "react";

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
	show: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function Drawer({ show, onClose, children }: Readonly<Props>) {
	return (
		<Transition as={Fragment} show={show}>
			<Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-900/80" />
				</TransitionChild>
				<div className="fixed inset-0 flex">
					<TransitionChild
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
							<TransitionChild
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
									<button className="p-2.5" onClick={onClose}>
										<span className="sr-only">Close sidebar</span>
										<XMarkIcon className="h-6 w-6 text-white" />
									</button>
								</div>
							</TransitionChild>
							{children}
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
}
