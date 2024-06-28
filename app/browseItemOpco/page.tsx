//This is for the page that displays operating companies stocking selected item from browse by item page

'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import { Opco, columns } from "../browseItemOpco/column";
import { useSearchParams } from "next/navigation";



export default function BrowseOpco() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string, itemId:string) => {
        let res = await fetch(`http://localhost:3000/api/itmOpcoData?username=${username}&itemId=${itemId}`,);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const username = searchParams.get("username");
    const itemId = searchParams.get("itemId");

    const [isLoading, setIsLoading] = React.useState(true);
  
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
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="WHSID" allowsSorting>Operating Co. ID</TableColumn>
          <TableColumn key="WHSNMDS" allowsSorting>Operating Co.</TableColumn>
        </TableHeader>
        <TableBody 
          items={list.items} 
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.WHSID}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  
