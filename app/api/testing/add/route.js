import dbConnect from '../../../../lib/db';
import Testing from '../../../../model/testing';
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    await dbConnect();

    try {
        const formData = await req.formData();

        const name = formData.get("name") || "";
        const age = formData.get("age") || "";
        const imageFile = formData.get("image");

        let imagePath = "";

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = path.join(process.cwd(), "public/uploads");
            const filePath = path.join(uploadDir, imageFile.name);

            await writeFile(filePath, buffer);

            imagePath = `/uploads/${imageFile.name}`;
        }

        const testing = await Testing.create({
            name,
            age,
            image: imagePath
        });

        return Response.json({ success: true, data: testing });

    } catch (err) {
        return Response.json(
            { success: false, error: err.message },
            { status: 400 }
        );
    }
}