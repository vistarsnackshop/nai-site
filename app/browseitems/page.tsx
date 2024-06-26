'use client'
import BrowseItemTable from "../tableComponents/browseByItem";
import { Item } from './column';

async function getItems(): Promise<Item[]> {
    const res = await fetch("http://localhost:3000/api/browseItemData");
    const data = await res.json();
    return data;
}

export default async function Browseitems() {
    const items = await getItems();
    return (
        <BrowseItemTable items={items} />
    );
}
