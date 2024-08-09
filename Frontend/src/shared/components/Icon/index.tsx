import { ElementType } from "react";

interface Props {
	component: ElementType;
	classNames: string;
}

export default function Icon({ component: Component, classNames }: Readonly<Props>) {
	return <Component className={classNames} />;
}
