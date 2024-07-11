"use client"
import { useSearchParams } from "next/navigation";
import InventoryStatsGrid from "../dashboardcomponents/inventoryStatsGrid";
import InventoryChart from "../dashboardcomponents/inventoryBarChart";
import PackDetails from "../dashboardcomponents/packDetails";
import PoCard from "../dashboardcomponents/poCard";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";

type Breadcrumb = {
    name: string;
    href: string;
  };

export default function InventoryPage(){
    const searchParams = useSearchParams()!;
    const username = searchParams.get("username");
    const itemId = searchParams.get("itemId");
    const itemDescription = localStorage.getItem("ItemDescription");

    const getPreviousPage = () => {
        const referer = document.referrer;
        if(referer.includes("/browseItemOpco")){
            return [
                { name: "Home", href: `/browsepage?username=${username}`},
                { name: "All Bid Items", href: `/browseitems?username=${username}` },
                { name: "Stocking Operating Companies", href: `/browseItemOpco?username=${username}&itemId=${itemId}`},
                { name: "Inventory", href: `/inventory?username=${username}&itemId=${itemId}`}
            ] as Breadcrumb[];
        } else if(referer.includes("/browsebiditem")){
            return [
                { name: "Home", href: `/browsepage?username=${username}`},
                { name: "View Bids", href: `/browsebids?username=${username}` },
                { name: "Bid Items", href: `/browsebiditem?username=${username}&itemId=${itemId}`},
                { name: "Inventory", href: `/inventory?username=${username}&itemId=${itemId}`}
            ] as Breadcrumb[];
        } else if(referer.includes("/browsebiditem")){
            return [
                { name: "Home", href: `/browsepage?username=${username}`},
                { name: "All Operating Companies", href: `/browseopco?username=${username}` },
                { name: "All Bid Items", href: `/browseopcoitem?username=${username}&itemId=${itemId}`},
                { name: "Inventory", href: `/inventory?username=${username}&itemId=${itemId}`}
            ] as Breadcrumb[];
        } else {
            return[];
        }
    };

    const breadcrumbs = getPreviousPage();

    return (
        <>
        <div>
            <div className="mb-5 flex justify-center">
            <Header username={username as string}/>
            </div>
            <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
                <p>Viewing Inventory For: {itemDescription}</p>
            </div>
            <div className="my-5 w-5/6 mx-auto">
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <InventoryStatsGrid/>
                </div>
                <div className="flex flex-row gap-4 w-screen">
                    <InventoryChart/>
                    <div className="flex flex-col gap-4 w-1/4">
                        <PackDetails/>
                        <PoCard/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}