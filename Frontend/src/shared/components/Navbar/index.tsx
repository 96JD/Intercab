import NavbarImage from "./components/NavbarImage";
import NavbarMainMenuButton from "./components/NavbarMainMenuButton";
import NavbarUploadButton from "./components/NavbarUploadButton";

export default function Navbar() {
	return (
		<div className="sticky top-0 z-40 flex h-20 items-center gap-x-5 border-b border-gray-200 bg-white px-5 shadow-sm lg:mx-auto lg:max-w-7xl lg:shadow-none">
			<NavbarMainMenuButton />
			<NavbarImage />
			<NavbarUploadButton />
		</div>
	);
}
