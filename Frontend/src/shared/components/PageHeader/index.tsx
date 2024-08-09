interface Props {
	title: string;
}

export default function PageHeader({ title }: Readonly<Props>) {
	return (
		<div className="rounded-t-lg bg-emerald-500">
			<h1 className="m-auto w-full max-w-md py-4 text-center text-xl font-medium leading-7 sm:truncate sm:tracking-tight">
				{title}
			</h1>
		</div>
	);
}
