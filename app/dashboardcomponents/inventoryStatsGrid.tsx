import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaTruck, FaChartLine, FaCalendarWeek } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

function InventoryStatsGrid() {
    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");
    const whsId = searchParams.get("whsId");

    const [inventory, setInventory] = useState([]);
    const [currentWeek, setCurrentWeek] = useState([]);

    useEffect(() => {
        const fetchStatsGridData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/statsGridData?itemId=${itemId}&whsId=${whsId}`);
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error("Error fetching statsGridData:", error);
            }
        };

        fetchStatsGridData();
    }, [itemId, whsId]);

    useEffect(() => {
        const fetchStatsGraphData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/statsGraphData?itemId=${itemId}&whsId=${whsId}`);
                const data = await response.json();
                setCurrentWeek(data);
            } catch (error) {
                console.error("Error fetching statsGraphData:", error);
            }
        };

        fetchStatsGraphData();
    }, [itemId, whsId]);

    return (
        <div className="flex gap-4 w-screen">
            {/* Quantity On Hand */}
            <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <FaBoxOpen className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-md text-gray-500 font-light">Quantity On Hand</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['DSPOHQT']}</p>))}</strong>
                    </div>
                </div>
            </div>

            {/* Quantity On Order */}
            <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-vistarGreen">
                    <FaTruck className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-md text-gray-500 font-light">Quantity On Order</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['DPONORQT']}</p>))}</strong>
                    </div>
                </div>
            </div>

            {/* Prior 4 Week Avg. Sales */}
            <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <FaChartLine className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-md text-gray-500 font-light">Prior 4 Week Avg. Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['DPAVDMQT']}</p>))}</strong>
                    </div>
                </div>
            </div>

            {/* Current Week Sales */}
            <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
                    <FaCalendarWeek className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-md text-gray-500 font-light">Current Week Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{currentWeek.length > 0 && <p>{currentWeek[0]['ORDBSQT']}</p>}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryStatsGrid;
