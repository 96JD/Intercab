import { Trip } from "../../../models/Trip";
import { FileUtils } from "../../../shared/functions/FileUtils";

interface Props {
	trip: Trip;
}

export default function TripItem({ trip }: Readonly<Props>) {
	return (
		<tr>
			<td className="whitespace-nowrap p-5 text-sm font-medium text-gray-900">{trip.licenseNumber}</td>
			<td className="whitespace-nowrap p-5 text-sm text-gray-500">{trip.carNumber}</td>
			<td className="whitespace-nowrap p-5 text-sm text-gray-500">{trip.price}</td>
			<td className="whitespace-nowrap p-5 text-sm text-gray-500">{trip.startDate}</td>
			<td className="whitespace-nowrap p-5 text-sm">
				<a
					className="font-medium text-emerald-600 hover:text-emerald-500"
					href={trip.report && FileUtils.getFileUrl(trip.report.path)}
					target="_blank"
					rel="noopener noreferrer"
				>
					{trip.report?.name}
				</a>
			</td>
		</tr>
	);
}
