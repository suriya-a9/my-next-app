import dbConnect from "../../../lib/db";
import Testing from "../../../model/testing";

export async function GET() {
    await dbConnect();
    try {
        const testingList = await Testing.find();
        return Response.json({ success: true, data: testingList }, { status: 200 })
    } catch (err) {
        return Response.json({ success: false }, { status: 400 })
    }
}