"use client"
import { useSearchParams } from "next/navigation";
import InventoryStatsGrid from "../dashboardcomponents/inventoryStatsGrid";
import InventoryChart from "../dashboardcomponents/inventoryBarChart";
import PackDetails from "../dashboardcomponents/packDetails";
import PoCard from "../dashboardcomponents/poCard";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";
import { useSession } from "next-auth/react"; 
import { useRouter } from 'next/navigation';
import { IoArrowBackCircle } from 'react-icons/io5';


export default function InventoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");
    const itemDescription = localStorage.getItem("ItemDescription");
    const whsDescription = localStorage.getItem("whsDescription");
    const { data: session } = useSession();
    const username = session?.user?.name;


    return (
        <>
            <div>
                <div className="mb-5 flex justify-center">
                    <Header />
                </div>
                <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
                    <p>Viewing Inventory For: {itemDescription} At {whsDescription}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <InventoryStatsGrid />
                    </div>
                    <div className="flex flex-row gap-4 w-screen">
                        <InventoryChart />
                        <div className="flex flex-col gap-4 w-1/4">
                            <PackDetails />
                            <PoCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
