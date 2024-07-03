"use client"
import InventoryStatsGrid from "../dashboardcomponents/inventoryStatsGrid";
import InventoryChart from "../dashboardcomponents/inventoryBarChart";
import PackDetails from "../dashboardcomponents/packDetails";
import PoCard from "../dashboardcomponents/poCard";

export default function InventoryPage(){
    return (
        <>
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
        </>
    );
}