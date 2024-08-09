import { MouseEvent } from "react";

interface Props {
	label: string;
	disabled?: boolean;
	onClick: (e: MouseEvent) => void;
}

export default function MainButton({ label, disabled, onClick }: Readonly<Props>) {
	return (
		<button
			className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm enabled:hover:bg-emerald-500 enabled:focus-visible:outline enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-emerald-600 disabled:opacity-50"
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
}
