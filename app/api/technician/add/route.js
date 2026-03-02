import dbConnect from '../../../../lib/db';
import Technician from '../../../../model/technician';

export async function POST(req) {
    await dbConnect();
    try {
        const { name, age } = await req.json();
        const technician = await Technician.create({ name, age });
        return Response.json({ success: true, data: technician });
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}