'use client'
import React, { useState } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Invoice, InvoiceLine } from "../invoice/column";
import { useSearchParams } from "next/navigation";
import Header from "../header/header";
import { useSession } from "next-auth/react"; 

type RangeValue<T> = { start: T; end: T } | null | undefined;

export default function ViewInvoice() {
    const fetchData = async (username: string, whsId: string, itemId: string, startDate: string, endDate: string) => {
        let res = await fetch(`http://localhost:3000/api/invoiceData?username=${username}&whsId=${whsId}&itemId=${itemId}&startDate=${startDate}&endDate=${endDate}`);
        let json = await res.json();
        return json;
    };

    const fetchLineDetails = async (invoice: string) => {
        let res = await fetch(`http://localhost:3000/api/invoiceDetail?invoice=${invoice}`);
        let json = await res.json();
        return json;
    };

    const searchParams = useSearchParams()!;
    const whsId = searchParams.get("whsId");
    const itemId = searchParams.get("itemId");
    const { data: session } = useSession();
    const username = session?.user?.name;
    let startDate = '';
    let endDate = '';

    const [dateRange, setDateRange] = useState<RangeValue<CalendarDate> | undefined | null>(null);

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        setDateRange(value);
        list.reload();
    };

    const formatDate = (date: CalendarDate) => {
        const year = date.year.toString();
        const month = date.month < 10 ? `0${date.month}` : date.month.toString();
        const day = date.day < 10 ? `0${date.day}` : date.day.toString();
        return `${year}${month}${day}`;
    };

    const formatDateString = (dateString: string) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}/${day}/${year}`;
    };

    const [isLoading, setIsLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [lineDetails, setLineDetails] = useState<InvoiceLine[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleRowClick = async (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        onOpen();
        let details = await fetchLineDetails(invoice.HSBLID);
        setLineDetails(details);
    };

    let list = useAsyncList<Invoice>({
        async load() {
            if (dateRange?.start && dateRange?.end) {
                startDate = formatDate(dateRange.start);
                endDate = formatDate(dateRange.end);
            }
            
            if (startDate && endDate) {
                let res = await fetchData(username as string, whsId as string, itemId as string, startDate, endDate);
                setIsLoading(false);

                return {
                    items: res,
                };
            }

            setIsLoading(false);
            return {
                items: [],
            };
        },

        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a: Invoice, b: Invoice) => {
                    let first = a[sortDescriptor.column as keyof Invoice];
                    let second = b[sortDescriptor.column as keyof Invoice];

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
            <div className="w-2/3 mx-auto">
                <DateRangePicker
                    className="w-full sm:w-full md:w-full lg:w-full xl:w-1/3"
                    label="Viewing"
                    description="Select Period To Display Invoices"
                    isRequired
                    value={dateRange}
                    onChange={handleDateChange}
                />
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
                        <TableColumn key="AACMSPID" allowsSorting>Ship To</TableColumn>
                        <TableColumn key="SPNMDS" allowsSorting>Location</TableColumn>
                        <TableColumn key="HSBLID" allowsSorting>Invoice</TableColumn>
                        <TableColumn key="HSIVCDT" allowsSorting>Date</TableColumn>
                        <TableColumn key="00005" allowsSorting>Amount</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={list.items}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.HSBLID} onClick={() => handleRowClick(item)}>
                                {(columnKey) => (
                                    <TableCell>
                                        {columnKey === 'HSIVCDT' ? formatDateString(item.HSIVCDT.toString()) : (getKeyValue(item, columnKey))}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedInvoice && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} aria-labelledby="invoice-details-modal" className="max-h-screen max-w-fit">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Invoice Line Details for Invoice {selectedInvoice.HSBLID}</ModalHeader>
                                <ModalBody className="overflow-y-auto">
                                    {lineDetails.length === 0 ? (
                                        <Spinner label="Loading..." />
                                    ) : (
                                        <Table aria-label="Line details" isStriped>
                                            <TableHeader>
                                                <TableColumn key="BLLINNB">Line No.</TableColumn>
                                                <TableColumn key="00002">Quantity Order</TableColumn>
                                                <TableColumn key="00003">Quantity Shipped</TableColumn>
                                                <TableColumn key="ITMID">Item No.</TableColumn>
                                                <TableColumn key="BLORIMDS">Description</TableColumn>
                                                <TableColumn key="00006">Item Price</TableColumn>
                                                <TableColumn key="00007">Total Item Price</TableColumn>
                                                <TableColumn key="00008">Tx</TableColumn>
                                            </TableHeader>
                                            <TableBody items={lineDetails}>
                                                {(lineItem: InvoiceLine) => (
                                                    <TableRow key={lineItem.BLLINNB}>
                                                        {(lineColumnKey) => (
                                                            <TableCell>{getKeyValue(lineItem, lineColumnKey)}</TableCell>
                                                        )}
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}
