// app/api/download/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;

        // Get transfer record
        const transfer = await prisma.transfer.findUnique({
            where: { id }
        });

        if (!transfer) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        // Check if file has expired
        if (transfer.expiresAt < new Date()) {
            return NextResponse.json(
                { error: "File has expired" },
                { status: 410 }
            );
        }

        // Increment download count
        await prisma.transfer.update({
            where: { id },
            data: {
                downloadCount: transfer.downloadCount + 1,
                lastDownloadAt: new Date()
            }
        });

        // Get encryption key from query or from user session
        const url = new URL(request.url);
        const encryptionKey = url.searchParams.get("key") || transfer.encryptionKey;

        if (!encryptionKey) {
            return NextResponse.json(
                { error: "Decryption key required" },
                { status: 400 }
            );
        }

        // Read and decrypt file
        const filePath = path.join(process.cwd(), "uploads", `${id}.enc`);

        try {
            const encryptedBuffer = await readFile(filePath);

            // Decrypt file
            const decipher = crypto.createDecipher("aes-256-gcm", encryptionKey);
            const decryptedBuffer = Buffer.concat([
                decipher.update(encryptedBuffer),
                decipher.final()
            ]);

            // Create response with file
            const response = new NextResponse(decryptedBuffer);

            response.headers.set("Content-Type", transfer.fileType || "application/octet-stream");
            response.headers.set("Content-Disposition", `attachment; filename="${transfer.fileName}"`);
            response.headers.set("Content-Length", decryptedBuffer.length.toString());

            return response;

        } catch (error) {
            console.error("File read error:", error);
            return NextResponse.json(
                { error: "File could not be decrypted" },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Download error:", error);
        return NextResponse.json(
            { error: "Download failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        const session = await getServerSession();

        // Verify ownership or admin rights
        const transfer = await prisma.transfer.findUnique({
            where: { id }
        });

        if (!transfer) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }


        await prisma.transfer.delete({
            where: { id }
        });


        const filePath = path.join(process.cwd(), "uploads", `${id}.enc`);
        await unlink(filePath).catch(() => {});

        return NextResponse.json({
            success: true,
            message: "File deleted successfully"
        });

    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { error: "Delete failed" },
            { status: 500 }
        );
    }
}