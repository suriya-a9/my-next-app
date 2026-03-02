import dbConnect from '../../../../../lib/db';
import Technician from '../../../../../model/technician';

export async function POST(req, context) {
    try {
        const params = await context.params;
        const technician = await Technician.findByIdAndDelete(params.id)
        return Response.json({ status: 200, data: technician, message: "Deleted Successfully" }, { success: true })
    } catch (err) {
        return Response.json({ status: 400, message: err.message }, { success: false })
    }
}