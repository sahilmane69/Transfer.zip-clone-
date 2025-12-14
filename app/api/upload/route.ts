// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const userId = session?.user?.id;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Generate unique ID for the file
        const fileId = uuidv4();
        const originalName = file.name;
        const fileType = file.type;
        const fileSize = file.size;

        // Generate encryption key for end-to-end encryption
        const encryptionKey = crypto.randomBytes(32).toString("hex");

        // Create file record in database
        const transfer = await prisma.transfer.create({
            data: {
                id: fileId,
                fileName: originalName,
                fileSize,
                fileType,
                uploadDate: new Date(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                downloadCount: 0,
                encryptionKey,
                downloadLink: `/download/${fileId}`,
                userId: userId || null,
                status: "active"
            }
        });

        // Save file to storage (encrypted)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // In production, use proper storage (S3, etc.)
        const uploadDir = path.join(process.cwd(), "uploads");
        const filePath = path.join(uploadDir, `${fileId}.enc`);

        // Encrypt file
        const cipher = crypto.createCipher("aes-256-gcm", encryptionKey);
        const encryptedBuffer = Buffer.concat([
            cipher.update(buffer),
            cipher.final()
        ]);

        await writeFile(filePath, encryptedBuffer);

        return NextResponse.json({
            success: true,
            fileId,
            fileName: originalName,
            fileSize,
            downloadLink: `/download/${fileId}`,
            expiresAt: transfer.expiresAt,
            encryptionKey: userId ? encryptionKey : undefined // Only return key for authenticated users
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
    );
}