import dbConnect from '../../../../../lib/db';
import Item from '../../../../../model/Item';

export async function POST(req, context) {
    await dbConnect();
    const { item } = await req.json();
    const params = await context.params;
    await Item.findByIdAndUpdate(params.id, { item }, { new: true });
    return Response.json({ success: true });
}