import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function UploadReportsWrapper({ children }: Readonly<Props>) {
	return <div className="p-5">{children}</div>;
}
