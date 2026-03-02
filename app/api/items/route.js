import dbConnect from '../../../lib/db';
import Item from '../../../model/Item';

export async function GET() {
    await dbConnect();
    const listData = await Item.find();
    return Response.json({ success: true, data: listData });
}