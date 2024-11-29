'use client'
import React, { useState, useEffect, Suspense } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Opco, columns } from "../browseItemOpco/column";
import { useSearchParams } from "next/navigation";
import InventoryButton from "../buttoncomponents/inventoryButton";
import InvoiceButton from "../buttoncomponents/invoiceButton";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";
import { useSession } from "next-auth/react"; 

function BrowseItemOpcoContent() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string, itemId: string) => {
        let res = await fetch(`http://localhost:3000/api/itmOpcoData?username=${username}&itemId=${itemId}`);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const itemId = searchParams.get("itemId");
    const { data: session } = useSession();
    const username = session?.user?.name;

    const breadcrumbs = [
        { name: "Home", href: `/browsepage?username=${username}` },
        { name: "All Bid Items", href: `/browseitems?username=${username}` },
        { name: "Stocking Operating Companies", href: `/browseItemOpco?username=${username}` }
    ];

    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

    // Retrieve ITEMDS from local storage on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const itemDescription = localStorage.getItem("ItemDescription");
            setSelectedItemDescription(itemDescription);
        }
    }, []);

    let list = useAsyncList<Opco>({
        async load() {
            let res = await fetchData(username as string, itemId as string);
            setIsLoading(false);
            return {
                items: res,
            };
        },

        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a: Opco, b: Opco) => {
                    let first = a[sortDescriptor.column as keyof Opco];
                    let second = b[sortDescriptor.column as keyof Opco];

                    // Attempt to parse the values as floats
                    const firstNumber = parseFloat(first as string);
                    const secondNumber = parseFloat(second as string);

                    // Determine if the values are numeric
                    const isFirstNumeric = !isNaN(firstNumber);
                    const isSecondNumeric = !isNaN(secondNumber);

                    let cmp: number;

                    if (isFirstNumeric && isSecondNumeric) {
                        // Both values are numeric, compare numerically
                        cmp = firstNumber - secondNumber;
                    } else {
                        // At least one value is alphanumeric, compare as strings
                        const firstString = first.toString().toLowerCase();
                        const secondString = second.toString().toLowerCase();
                        cmp = firstString < secondString ? -1 : firstString > secondString ? 1 : 0;
                    }

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    return (
        <div>
            <div className="mb-5 flex justify-center">
                <Header/>
            </div>
            <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
                <p>Operating Companies Stocking: {selectedItemDescription}</p>
            </div>
            <div className="my-5 w-2/3 mx-auto">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="w-2/3 mx-auto">
                <Table
                    aria-label="Example table with client side sorting"
                    sortDescriptor={list.sortDescriptor}
                    onSortChange={list.sort}
                    isStriped
                >
                    <TableHeader>
                        <TableColumn key="WHSID" allowsSorting>Operating Co. ID</TableColumn>
                        <TableColumn key="WHSNMDS" allowsSorting>Operating Co.</TableColumn>
                        <TableColumn key="viewInventory" className="text-center w-64">View Inventory</TableColumn>
                        <TableColumn key="viewInvoice" className="text-center w-64">View Invoices</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={list.items}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.WHSID}>
                                {(columnKey) =>
                                    <TableCell>
                                        {columnKey === 'viewInventory' ? (
                                            <div className="flex items-center justify-center">
                                                <InventoryButton itemId={itemId as string} whsId={item.WHSID} whsDS={item.WHSNMDS}>Inventory</InventoryButton>
                                            </div>
                                        ) : columnKey === 'viewInvoice' ? (
                                            <div className="flex items-center justify-center">
                                                <InvoiceButton itemId={itemId as string} whsId={item.WHSID}>Invoices</InvoiceButton>
                                            </div>
                                        ) : (
                                            getKeyValue(item, columnKey)
                                        )}
                                    </TableCell>
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default function BrowseItemOpco() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
          <BrowseItemOpcoContent />
        </Suspense> 
    );
}
