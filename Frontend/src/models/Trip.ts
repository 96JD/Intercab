import { Report } from "./Report";

export interface Trip {
	id: number;
	licenseNumber: string;
	carNumber?: string;
	price: number;
	startDate?: string;
	reportId: number;
	report?: Report;
}
