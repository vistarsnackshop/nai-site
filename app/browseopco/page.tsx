//this page is for after selecting browse by operating company
'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import { Opco, columns } from "../browseopco/column";
import { useSearchParams } from "next/navigation";
import OpcoItemButton from "../buttoncomponents/opcoBidItems";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";
import { useSession } from "next-auth/react"; 



export default function BrowseOpco() {
    //get query to connect to this table without having to hardcode
    const fetchData = async (username: string) => {
      let res = await fetch(`http://localhost:3000/api/browseOpcoData?username=${username}`);
      let json = await res.json();
      return json;
    };

    const { data: session } = useSession();
    const username = session?.user?.name;

    const breadcrumbs = [
      { name: "Home", href: `/browsepage?username=${username}`},
      { name: "All Operating Companies", href: "/browseopco" },
    ];

    const [isLoading, setIsLoading] = React.useState(true);
  
    let list = useAsyncList<Opco>({
        async load() {
            let res = await fetchData(username as string);
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
          <Header/>
        </div>
        <div className="my-5 w-2/3 mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
        </div>
        <div className="w-2/3 mx-auto">
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
              <TableColumn key="WHSID" allowsSorting>Operating Co. ID</TableColumn>
              <TableColumn key="WHSNMDS" allowsSorting>Operating Co.</TableColumn>
              <TableColumn key="Item" className="text-center w-96">View Bid Items</TableColumn>
            </TableHeader>
            <TableBody 
              items={list.items} 
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item) => (
                <TableRow key={item.WHSID}>
                  {(columnKey) => <TableCell>{columnKey === 'Item' ? (<div className="flex items-center justify-center"><OpcoItemButton whsId={item.WHSID} whsDS={item.WHSNMDS}>Items</OpcoItemButton></div>): (getKeyValue(item, columnKey))}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  );
}
  
