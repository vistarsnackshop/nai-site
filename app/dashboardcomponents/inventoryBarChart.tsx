import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"; 

// Define the Inventory interface
interface Inventory {
    FSCLWKNB: number;
    ORDBSQT: number;
    name: string;
    Quantity: number;
}

// Fetch data from the API
const fetchData = async (whsId: string, itemId: string) => {
    const res = await fetch(`http://localhost:3000/api/statsGraphData?itemId=${itemId}&whsId=${whsId}`);
    const json = await res.json();
    return json;
};

// Prepare data for the chart
function prepData(apiData: any[]): Inventory[] {
    const weekMapping: { [key: number]: number } = {
        50: 1,
        49: 2,
        48: 3,
        47: 4,
    };

    return apiData
        .filter(item => item.FSCLWKNB !== 51)
        .map(item => ({
            FSCLWKNB: item.FSCLWKNB,
            ORDBSQT: item.ORDBSQT,
            name: weekMapping[item.FSCLWKNB] !== undefined ? `Week ${weekMapping[item.FSCLWKNB]}` : `Week ${item.FSCLWKNB}`,
            Quantity: item.ORDBSQT,
        }));
}

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div>
                <p>{`Quantity: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const InventoryChart: React.FC = () => {
    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");
    const whsId = searchParams.get("whsId");

    const [data, setData] = useState<Inventory[]>([]);

    useEffect(() => {
        // Fetch and transform the data within the useEffect hook
        const getData = async () => {
            if (whsId && itemId) {
                const apiData = await fetchData(whsId, itemId);
                const transformedData = prepData(apiData);
                setData(transformedData);
            }
        };

        getData();
    }, [whsId, itemId]); // Re-run the effect when whsId or itemId changes

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Quantity Ordered Prior Weeks</strong>
            <div className="w-full mt-3 flex-1 text-md">
                <ResponsiveContainer width="100%" height="96rem">
                    <BarChart data={data} width={500}>
                        <CartesianGrid strokeDasharray="3 3 0 0 " vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="Quantity" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        
    );
};

export default InventoryChart;
