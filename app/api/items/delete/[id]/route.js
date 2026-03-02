import dbConnect from '../../../../../lib/db';
import Item from '../../../../../model/Item';

export async function POST(req, context) {
    await dbConnect();
    const params = await context.params;
    await Item.findByIdAndDelete(params.id);
    return Response.json({ success: true });
}