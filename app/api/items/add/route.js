import dbConnect from '../../../../lib/db';
import Item from '../../../../model/Item';

export async function POST(req) {
    await dbConnect();
    const { item } = await req.json();
    await Item.create({ item });
    return Response.json({ success: true });
}