"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Bid, columns } from "../browsebids/column";
import { useSearchParams } from "next/navigation";
import BidItemButton from "../buttoncomponents/bidItems";
import Header from "../header/header";
import Breadcrumbs from "../header/breadcrumb";

export default function BrowseBids() {
  //get query to connect to this table without having to hardcode
  const fetchData = async (username: string) => {
    let res = await fetch(
      `http://localhost:3000/api/browseBidData?username=${username}`
    );
    let json = await res.json();
    return json;
  };

  const searchParams = useSearchParams()!;
  const username = searchParams.get("username");

  const breadcrumbs = [
    { name: "Home", href: `/browsepage?username=${username}` },
    { name: "View Bids", href: `/browsebids?username=${username}` },
  ];

  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList<Bid>({
    async load() {
      let res = await fetchData(username as string);
      //let json = await res.json();
      setIsLoading(false);
      return {
        items: res,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a: Bid, b: Bid) => {
          let first = a[sortDescriptor.column as keyof Bid];
          let second = b[sortDescriptor.column as keyof Bid];

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
            cmp =
              firstString < secondString
                ? -1
                : firstString > secondString
                ? 1
                : 0;
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
        <Header username={username as string} />
      </div>
      <div className="my-5 w-2/3 mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
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
            <TableColumn key="WHSID" allowsSorting>
              Operating Co. ID
            </TableColumn>
            <TableColumn key="WHSNMDS" allowsSorting>
              Operating Co.
            </TableColumn>
            <TableColumn key="BDID" allowsSorting>
              Bid
            </TableColumn>
            <TableColumn key="BDDESC">Bid Description</TableColumn>
            <TableColumn key="Item" className="text-center w-96">
              View Bid Items
            </TableColumn>
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item) => (
              <TableRow key={item.BDID}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "Item" ? (
                      <div className="flex items-center justify-center">
                        <BidItemButton
                          username={username as string}
                          bidId={item.BDID}
                          whsId={item.WHSID}
                        >
                          Items
                        </BidItemButton>
                      </div>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
