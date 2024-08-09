import { clsx } from "clsx";
import _ from "lodash";
import { ChangeEvent } from "react";

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

interface Props {
	uploadedReports?: FileList;
	updateUploadedReports?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadReportsInput({ uploadedReports, updateUploadedReports }: Readonly<Props>) {
	return (
		<div className="col-span-full my-10 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10">
			<div>
				<ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-300" />
				<div className="mt-4 text-sm leading-6 text-gray-600">
					<label
						className="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2"
						htmlFor="file-upload"
					>
						<span
							className={clsx(
								_.isEmpty(uploadedReports)
									? "text-gray-500 focus-within:ring-gray-500 hover:text-gray-400"
									: "text-emerald-500 focus-within:ring-emerald-500 hover:text-emerald-400"
							)}
						>
							{_.isEmpty(uploadedReports)
								? "Upload Your Reports!"
								: `Uploaded Files: ${_.toString(_.size(uploadedReports))}`}
						</span>
						<input
							className="sr-only"
							id="file-upload"
							type="file"
							onChange={updateUploadedReports}
							multiple
						/>
					</label>
				</div>
			</div>
		</div>
	);
}
