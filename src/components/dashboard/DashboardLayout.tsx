import { useProfileStore } from "@/hooks/dashboard/useProfileStore";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";

function DashboardLayout() {
	const loaderData = useLoaderData();
	const { setProfile } = useProfileStore();

	useEffect(() => {
		console.log("User", loaderData.user);
		if (loaderData.user) {
			setProfile(loaderData.user);
		}
	}, []);

	return (
		<div className='min-h-screen grid grid-cols-[250px_1fr] grid-rows-[auto_1fr] h-screen'>
			{/* Sidebar - spans full height */}

			<SideBar className='row-span-2' />

			{/* Header - spans remaining width */}

			<Header className='col-start-2' />

			{/* Main content area */}
			<main className='col-start-2 bg-[#f8fafe] overflow-auto   '>
				<Outlet />
			</main>
		</div>
	);
}

export default DashboardLayout;
