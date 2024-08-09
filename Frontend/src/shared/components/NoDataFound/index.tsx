interface Props {
	data: string;
}

export default function NoDataFound({ data }: Readonly<Props>) {
	return <div className="flex justify-center p-5 font-bold">No {data} Found!</div>;
}
