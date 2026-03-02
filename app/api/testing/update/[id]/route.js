import dbConnect from "../../../../../lib/db";
import Testing from "../../../../../model/testing";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req, context) {
    await dbConnect();

    try {
        const { id } = await context.params;
        const formData = await req.formData();

        const name = formData.get("name");
        const age = formData.get("age");
        const imageFile = formData.get("image");

        const existing = await Testing.findById(id);
        if (!existing) {
            return Response.json(
                { success: false, message: "Not found" },
                { status: 404 }
            );
        }

        let imagePath = existing.image;

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = path.join(process.cwd(), "public/uploads");

            const fileName = Date.now() + "-" + imageFile.name; // prevent overwrite
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            imagePath = `/uploads/${fileName}`;
        }

        const updated = await Testing.findByIdAndUpdate(
            id,
            { name, age, image: imagePath },
            { new: true }
        );

        return Response.json({ success: true, data: updated });

    } catch (err) {
        return Response.json(
            { success: false, error: err.message },
            { status: 400 }
        );
    }
}