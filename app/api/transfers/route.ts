// app/api/transfers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // Get user's transfers
        const transfers = await prisma.transfer.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                uploadDate: "desc"
            },
            skip,
            take: limit,
            select: {
                id: true,
                fileName: true,
                fileSize: true,
                fileType: true,
                uploadDate: true,
                expiresAt: true,
                downloadCount: true,
                status: true,
                downloadLink: true
            }
        });

        // Get total count for pagination
        const total = await prisma.transfer.count({
            where: {
                userId: session.user.id
            }
        });

        // Calculate storage used
        const storageUsed = await prisma.transfer.aggregate({
            where: {
                userId: session.user.id,
                status: "active"
            },
            _sum: {
                fileSize: true
            }
        });

        return NextResponse.json({
            transfers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            stats: {
                totalTransfers: total,
                activeTransfers: transfers.filter(t => t.status === "active").length,
                storageUsed: storageUsed._sum.fileSize || 0
            }
        });

    } catch (error) {
        console.error("Transfers fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch transfers" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { fileName, fileSize, fileType, expiresInDays = 7 } = body;

        // Create a transfer record
        const transfer = await prisma.transfer.create({
            data: {
                fileName,
                fileSize,
                fileType,
                uploadDate: new Date(),
                expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
                downloadCount: 0,
                userId: session.user.id,
                status: "pending", // File not uploaded yet
                downloadLink: `/download/temp-${Date.now()}`
            }
        });

        return NextResponse.json({
            success: true,
            transferId: transfer.id,
            uploadUrl: `/api/upload/${transfer.id}`
        });

    } catch (error) {
        console.error("Transfer creation error:", error);
        return NextResponse.json(
            { error: "Failed to create transfer" },
            { status: 500 }
        );
    }
}