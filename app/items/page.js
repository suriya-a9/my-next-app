import ItemClient from "./ItemClient";
import dbConnect from "../lib/db";
import Item from "../model/Item";

export default async function ItemPage() {
    await dbConnect();

    const items = await Item.find().lean();

    return <ItemClient initialItems={JSON.parse(JSON.stringify(items))} />;
}