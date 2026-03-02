import dbConnect from "../../lib/db";
import Testing from "../../model/testing";
import TestClient from "./testClient";

export default async function TestServer() {
    await dbConnect();
    const tests = await Testing.find().lean();

    return <TestClient initialItems={JSON.parse(JSON.stringify(tests))} />
}