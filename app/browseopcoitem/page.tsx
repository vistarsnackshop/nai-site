'use client'
import React, { useState, useEffect, Suspense } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Pagination } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Item } from "../browseopcoitem/column";
import { useSearchParams } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";
import InventoryButton from "../buttoncomponents/inventoryButton";
import InvoiceButton from "../buttoncomponents/invoiceButton";
import { useSession } from "next-auth/react"; 

export default function BrowseOpcoItem() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string, whsId: string) => {
        let res = await fetch(`http://localhost:3000/api/opcoItmData?username=${username}&whsid=${whsId}`);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const whsId = searchParams.get("whsid");
    const { data: session } = useSession();
    const username = session?.user?.name;

    const breadcrumbs = [
        { name: "Home", href: "/browsepage" },
        { name: "All Operating Companies", href: "/browseopco" },
        { name: "All Bid Items", href: "/browseopcoitem" }
    ];

    const handleClick = (itemDescription: string) => {
        // Store the item description in local storage
        localStorage.setItem('ItemDescription', itemDescription);
    };

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWhsDescription, setSelectedWhsDescription] = useState<string | null>(null);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 20;

    // Retrieve WHSDS from local storage on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const whsDescription = localStorage.getItem("whsDescription");
            setSelectedWhsDescription(whsDescription);
        }
    }, []);

    let list = useAsyncList<Item>({
        async load() {
            let res = await fetchData(username as string, whsId as string);
            setIsLoading(false);
            return {
                items: res,
            };
        },

        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a: Item, b: Item) => {
                    let first = a[sortDescriptor.column as keyof Item];
                    let second = b[sortDescriptor.column as keyof Item];

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

    // Filter items based on search query
    const filterItems = (query: string) => {
        if (!query) {
            setFilteredItems(list.items);
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filteredData = list.items.filter((item) =>
                item.ITEMDS.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredItems(filteredData);
        }
    };

    // Update filtered items when searchQuery changes
    useEffect(() => {
        filterItems(searchQuery);
    }, [searchQuery, list.items]);

    // Scroll to the top of the page when the page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const pageItems = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div>
            <div className="mb-5 flex justify-center">
                <Header/>
            </div>
            <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
                <p>Bid Items Stocked At: {selectedWhsDescription}</p>
            </div>
            <div className="my-5 w-2/3 mx-auto">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="w-2/3 mx-auto">
                {/* Search bar with magnifying glass icon */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md py-2 px-4 w-1/3 pl-10"
                        placeholder="Search By Item Description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaMagnifyingGlass className="text-gray-400" />
                    </div>
                </div>

                {/* Table component */}
                <Table
                    isStriped
                    aria-label="Example table with client side sorting"
                    sortDescriptor={list.sortDescriptor}
                    onSortChange={list.sort}
                    bottomContent={
                        <div className="flex w-full justify-center">
                          <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                          />
                        </div>
                    }
                    classNames={{
                        table: "min-h-[400px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key="ITMID" allowsSorting>Item No.</TableColumn>
                        <TableColumn key="ITEMDS" allowsSorting>Item Description</TableColumn>
                        <TableColumn key="viewInventory" className="text-center w-64">View Inventory</TableColumn>
                        <TableColumn key="viewInvoice" className="text-center w-64">View Invoices</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={pageItems}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.ITMID}>
                                {(columnKey) =>
                                    <TableCell>
                                        {columnKey === 'viewInventory' ? (
                                            <div className="flex items-center justify-center">
                                                <InventoryButton itemId={item.ITMID.trim()} whsId={whsId as string} whsDS={selectedWhsDescription as string} onClick={() => handleClick(item.ITEMDS)}>Inventory</InventoryButton>
                                            </div>
                                        ) : columnKey === 'viewInvoice' ? (
                                            <div className="flex items-center justify-center">
                                                <InvoiceButton itemId={item.ITMID.trim()} whsId={whsId as string}>Invoices</InvoiceButton>
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
