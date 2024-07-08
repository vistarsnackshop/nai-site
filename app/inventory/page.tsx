"use client"
import { useSearchParams } from "next/navigation";
import InventoryStatsGrid from "../dashboardcomponents/inventoryStatsGrid";
import InventoryChart from "../dashboardcomponents/inventoryBarChart";
import PackDetails from "../dashboardcomponents/packDetails";
import PoCard from "../dashboardcomponents/poCard";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";

export default function InventoryPage(){
    const searchParams = useSearchParams()!;
    const username = searchParams.get("username");

    return (
        <>
        <div>
            <div className="mb-5 flex justify-center">
            <Header username={username as string}/>
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