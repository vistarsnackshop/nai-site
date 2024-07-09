//This is for the page that displays the list of bid items and their prices after browsing by bid

'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import { Item } from "../browsebiditem/column";
import { useSearchParams } from "next/navigation";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";
import InventoryButton from "../buttoncomponents/inventoryButton";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";



export default function BrowseBidItem() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string, bidId:string) => {
        let res = await fetch(`http://localhost:3000/api/bidItemData?username=${username}&bidid=${bidId}`,);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const username = searchParams.get("username");
    const bidId = searchParams.get("bidid");
    const whsId = searchParams.get("whsId")

    const breadcrumbs = [
      { name: "Home", href: `/browsepage?username=${username}`},
      { name: "View Bids", href: `/browsebids?username=${username}`},
      { name: "Bid Items", href: `/browsebiditem?username=${username}&bidid=${bidId}`}
    ];

    const handleClick = (itemDescription:string) => {
      // Store the item description in local storage
      localStorage.setItem('ItemDescription', itemDescription);
    };

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [selectedBidId, setSelectedBidId] = useState<string | null>(null);

    // Retrieve ITEMDS from local storage on client side
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const bidId = localStorage.getItem("bidId");
        setSelectedBidId(bidId);
      }
    }, []);
  
    let list = useAsyncList<Item>({
        async load() {
            let res = await fetchData(username as string, bidId as string);
            //let json = await res.json();
            setIsLoading(false);
            return {
                items: res,
             };
        },

        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a:Item, b:Item) => {
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
    React.useEffect(() => {
      filterItems(searchQuery);
    }, [searchQuery, list.items]);
  
    return (
      <div>
        <div className="mb-5 flex justify-center">
          <Header username={username as string}/>
        </div>
        <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
          <p>Currently Viewing Bid: {selectedBidId}</p>
        </div>
        <div className="my-5 w-2/3 mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
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
            classNames={{
              table: "min-h-[400px]",
            }}
          >
            <TableHeader>
              <TableColumn key="ITMID" allowsSorting>Item No.</TableColumn>
              <TableColumn key="ITEMDS" allowsSorting>Item Description</TableColumn>
              <TableColumn key="BDCUITAM" allowsSorting>Bid Price</TableColumn>
              <TableColumn key="view" className="text-center w-96">View Inventory</TableColumn>
            </TableHeader>
            <TableBody 
              items={filteredItems} 
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item) => (
                <TableRow key={item.ITMID}>
                  {(columnKey) => <TableCell>{columnKey === 'view' ? (<div className="flex items-center justify-center"><InventoryButton username={username as string} itemId={item.ITMID.trim() as string} whsId={whsId as string} onClick={() => handleClick(item.ITEMDS as string)}>Inventory</InventoryButton></div>): (getKeyValue(item, columnKey))}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  

  
