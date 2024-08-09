import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function TripListWrapper({ children }: Readonly<Props>) {
	return (
		<div className="flow-root overflow-x-auto">
			<div className="inline-block min-w-full p-5 align-middle">
				<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">{children}</div>
			</div>
		</div>
	);
}
