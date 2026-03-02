import dbConnect from "../../../../../lib/db";
import Testing from "../../../../../model/testing";

export async function POST(req, context) {
    await dbConnect();
    try {
        const params = await context.params;
        const testingList = await Testing.findByIdAndDelete(params.id)
        return Response.json({ success: true, data: testingList }, { status: 200 })
    } catch (err) {
        return Response.json({ success: false }, { status: 400 })
    }
}