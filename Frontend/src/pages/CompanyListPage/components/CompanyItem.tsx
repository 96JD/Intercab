import { Company } from "../../../models/Company";

interface Props {
	company: Company;
}

export default function CompanyItem({ company }: Readonly<Props>) {
	return (
		<li className="col-span-1 flex rounded-md shadow-sm">
			<div className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-emerald-500 text-sm font-medium text-white">
				{company.name.charAt(0)}
			</div>
			<div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
				<div className="flex-1 truncate px-4 py-2 text-sm">
					<p className="font-medium text-gray-900">{company.name}</p>
					<p className="truncate text-gray-500">{company.address}</p>
				</div>
			</div>
		</li>
	);
}
