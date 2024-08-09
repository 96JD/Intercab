import { PaperClipIcon } from "@heroicons/react/20/solid";

import { Report } from "../../../models/Report";
import { FileUtils } from "../../../shared/functions/FileUtils";

interface Props {
	report: Report;
}

export default function ReportItem({ report }: Readonly<Props>) {
	return (
		<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
			<div className="flex w-0 flex-1 items-center">
				<PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
				<div className="ml-4 flex min-w-0 flex-1 gap-2">
					<span className="truncate font-medium">{report.name}</span>
					<span className="flex-shrink-0 text-gray-400">{report.company?.name}</span>
				</div>
			</div>
			<div className="ml-4 flex-shrink-0">
				<a
					className="font-medium text-emerald-600 hover:text-emerald-500"
					href={FileUtils.getFileUrl(report.path)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Download
				</a>
			</div>
		</li>
	);
}
