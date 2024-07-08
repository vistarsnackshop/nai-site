import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

// Define the type for your purchase order data
interface PurchaseOrder {
    EXPRCTQT: number;
    RCECRCDT: string;
}

function PoCard() {
    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");
    const whsId = searchParams.get("whsId");

    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPOData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/purchaseOrderData?itemId=${itemId}&whsId=${whsId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPurchaseOrders(data);
            } catch (error) {
                console.error("Error fetching purchase order data:", error);
                setError("Failed to fetch purchase orders");
            } finally {
                setLoading(false);
            }
        };

        if (itemId && whsId) {
            fetchPOData();
        }
    }, [itemId, whsId]);

    // Helper function to format the date
    const formatDate = (dateString: string) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}/${day}/${year}`;
    };

    if (loading) {
        return <p>Loading...</p>; // Placeholder for loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Display error message if fetching fails
    }

    return (
        <div className="flex flex-col">
            <div className="bg-white rounded-sm p-4 border border-gray-200">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500 mb-4">
                    <FaClipboardList className="text-2xl text-white" />
                </div>
                <span className="text-md text-gray-500 font-light">Purchase Orders</span>
                <div className="mt-4">
                    {purchaseOrders.length > 0 ? (
                        purchaseOrders.map((order, index) => (
                            <div key={index} className="mb-2 p-2 bg-gray-100 rounded-sm">
                                <p className="text-lg text-gray-700 font-semibold">
                                    Expected Date: {formatDate(order.RCECRCDT.toString())}
                                </p>
                                <p className="text-md text-gray-600">
                                    Quantity Expected: {order.EXPRCTQT}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No purchase orders available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PoCard;
