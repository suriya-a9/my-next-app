import dbConnect from '../../../lib/db';
import Technician from '../../../model/technician';

export async function GET() {
    await dbConnect();
    const listData = await Technician.find();
    return Response.json({ success: true, data: listData });
}