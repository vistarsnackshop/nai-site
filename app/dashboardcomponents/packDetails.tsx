import React, { useState, useEffect } from "react";
import { FaDolly } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

function PackDetails() {
    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");

    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPackData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/packData?itemId=${itemId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchPackData();
        }
    }, [itemId]);

    if (loading) {
        return <p>Loading...</p>; // Placeholder for loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Display error message if fetching fails
    }

    return (
        <div className="flex gap-4">
            <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
                <div className="flex flex-col items-center">
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-500">
                        <FaDolly className="text-2xl text-white" />
                    </div>
                    <span className="text-md text-gray-500 font-light mt-2">Item Details</span>
                </div>
                <div className="pl-4">
                    <span className="text-md text-gray-500 font-light">Unit Of Measure</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['SKPUOMCD']}</p>))}</strong>
                    </div>
                    <span className="text-md text-gray-500 font-light">Pack/Size</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['00002']}</p>))}</strong>
                    </div>
                    <span className="text-md text-gray-500 font-light">Supplier</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['SUPNMDS']}</p>))}</strong>
                    </div>
                    <span className="text-md text-gray-500 font-light">Supplier Item No.</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{inventory.map((list, index) => (<p key={index}>{list['SUPMFGDS']}</p>))}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackDetails;
