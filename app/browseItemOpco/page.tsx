//This is for the page that displays operating companies stocking selected item from browse by item page

'use client'
import React, { useState, useEffect} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import { Opco, columns } from "../browseItemOpco/column";
import { useSearchParams } from "next/navigation";
import InventoryButton from "../buttoncomponents/inventoryButton";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";



export default function BrowseItemOpco() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string, itemId:string) => {
        let res = await fetch(`http://localhost:3000/api/itmOpcoData?username=${username}&itemId=${itemId}`,);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const username = searchParams.get("username");
    const itemId = searchParams.get("itemId");

    const breadcrumbs = [
      { name: "Home", href: `/browsepage?username=${username}`},
      { name: "All Bid Items", href: `/browseitems?username=${username}` },
      { name: "Stocking Operating Companies", href: `/browseItemOpco?username=${username}`}
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
            //let json = await res.json();
            setIsLoading(false);
            return {
                items: res,
             };
        },

        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a:Opco, b:Opco) => {
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
          <Header username={username as string}/>
        </div>
        <div className="text-gray-700 text-2xl font-extrabold mb-5 flex justify-center">
          <p>Operating Companies Stocking: {selectedItemDescription}</p>
        </div>
        <div className="my-5 w-2/3 mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
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
              <TableColumn key="view" className="text-center w-96">View Inventory</TableColumn>
            </TableHeader>
            <TableBody 
              items={list.items} 
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item) => (
                <TableRow key={item.WHSID} >
                  {(columnKey) => <TableCell>{columnKey === 'view' ? (<div className="flex items-center justify-center"><InventoryButton username={username as string} itemId={itemId as string} whsId={item.WHSID}>Inventory</InventoryButton></div>): (getKeyValue(item, columnKey))}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
