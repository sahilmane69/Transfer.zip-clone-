import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split(".").pop();
        const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`;

        // Save file to public/uploads
        const filePath = path.join(uploadsDir, uniqueFilename);
        await writeFile(filePath, buffer);

        // Generate download URL
        const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/uploads/${uniqueFilename}`;

        return NextResponse.json({
            success: true,
            filename: uniqueFilename,
            originalName: file.name,
            size: file.size,
            downloadUrl,
            message: "File uploaded successfully",
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

// Configure body parser for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};