import { BACKEND_API_URL } from "../../reduxToolkit/api";

export const FileUtils = {
	getFileUrl(path: string) {
		return import.meta.env.DEV ? `${BACKEND_API_URL}/${path}` : path;
	}
};
