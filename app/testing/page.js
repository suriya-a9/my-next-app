import dbConnect from "../../lib/db";
import Testing from "../../model/testing";
import TestClient from "./testClient";

export const metadata = {
    title: "Testing Page",
    description: "View and manage testing items.",
    keywords: ["testing", "nextjs", "crud", "demo"],
    openGraph: {
        title: "Testing Page",
        description: "View and manage testing items.",
        url: "http://localhost:3000/testing",
        images: [
            {
                url: "http://localhost:3000/og-image.png",
                width: 800,
                height: 600,
                alt: "Testing Page",
            },
        ],
    },
};

export default async function TestServer() {
    await dbConnect();
    const tests = await Testing.find().lean();

    return <TestClient initialItems={JSON.parse(JSON.stringify(tests))} />
}