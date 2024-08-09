import { Company } from "./Company";
import { Trip } from "./Trip";

export interface Report {
	id: number;
	name: string;
	path: string;
	isGenerated: number;
	createdDate?: string;
	companyId: number;
	company?: Company;
	trips?: Trip[];
}
