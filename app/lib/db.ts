// lib/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

// Helper functions
export async function checkStorageLimit(userId: string, fileSize: bigint) {
    const user = await db.user.findUnique({
        where: { id: userId },
        select: { storageUsed: true, storageLimit: true }
    });

    if (!user) return false;

    const newStorageUsed = user.storageUsed + fileSize;
    return newStorageUsed <= user.storageLimit;
}

export async function updateStorageUsed(userId: string, fileSize: bigint, operation: 'add' | 'subtract') {
    const change = operation === 'add' ? fileSize : -fileSize;

    return await db.user.update({
        where: { id: userId },
        data: {
            storageUsed: {
                increment: change
            }
        }
    });
}

export async function getTransferStats(userId?: string) {
    const whereClause = userId ? { userId } : {};

    const stats = await db.transfer.aggregate({
        where: whereClause,
        _sum: {
            fileSize: true,
            downloadCount: true
        },
        _count: {
            id: true
        }
    });

    const recentTransfers = await db.transfer.findMany({
        where: whereClause,
        orderBy: { uploadDate: 'desc' },
        take: 10,
        select: {
            id: true,
            fileName: true,
            fileSize: true,
            uploadDate: true,
            downloadCount: true,
            status: true
        }
    });

    return {
        totalSize: stats._sum.fileSize || 0n,
        totalDownloads: stats._sum.downloadCount || 0,
        totalTransfers: stats._count.id || 0,
        recentTransfers
    };
}

export async function cleanupExpiredTransfers() {
    const expiredTransfers = await db.transfer.findMany({
        where: {
            expiresAt: { lt: new Date() },
            status: 'active'
        },
        select: {
            id: true,
            userId: true,
            fileSize: true
        }
    });

    for (const transfer of expiredTransfers) {
        // Update user storage if user exists
        if (transfer.userId) {
            await updateStorageUsed(transfer.userId, transfer.fileSize, 'subtract');
        }

        // Mark transfer as expired
        await db.transfer.update({
            where: { id: transfer.id },
            data: { status: 'expired' }
        });
    }

    return expiredTransfers.length;
}

export async function getUserTransfers(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [transfers, total] = await Promise.all([
        db.transfer.findMany({
            where: { userId },
            orderBy: { uploadDate: 'desc' },
            skip,
            take: limit,
            select: {
                id: true,
                fileId: true,
                fileName: true,
                fileSize: true,
                fileType: true,
                uploadDate: true,
                expiresAt: true,
                downloadCount: true,
                status: true,
                downloadLink: true
            }
        }),
        db.transfer.count({
            where: { userId }
        })
    ]);

    return {
        transfers,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}