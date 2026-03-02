import TechClient from "./TechClient";
import dbConnect from "../../lib/db";
import Technician from "../../model/technician";

export default async function TechPage() {
    await dbConnect();

    const technicians = await Technician.find().lean();

    return (
        <TechClient initialItems={JSON.parse(JSON.stringify(technicians))} />
    )
}