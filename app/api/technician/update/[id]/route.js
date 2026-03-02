import dbConnect from '../../../../../lib/db';
import Technician from '../../../../../model/technician';

export async function POST(req, context) {
    await dbConnect();
    try {
        const { ...updateFields } = await req.json();
        const params = await context.params;
        const technician = await Technician.findByIdAndUpdate(
            params.id,
            updateFields,
            { new: true }
        )
        return Response.json(
            { success: true, message: "Updated Successfully", data: technician },
            { status: 200 }
        )
    } catch (err) {
        return Response.json(
            { success: false, error: err.message },
            { status: 500 }
        )
    }
}