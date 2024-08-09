import { Report } from "./Report";

export interface Company {
	id: number;
	name: string;
	address: string;
	reports?: Report[];
}
