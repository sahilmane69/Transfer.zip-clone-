// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Combine Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format date to relative time
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
}

/**
 * Generate a secure random string
 */
export function generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

/**
 * Generate a secure download token
 */
export function generateDownloadToken(fileId: string, expiresInMinutes = 30): string {
    const payload = {
        fileId,
        exp: Math.floor(Date.now() / 1000) + (expiresInMinutes * 60),
        iat: Math.floor(Date.now() / 1000)
    };

    const secret = process.env.DOWNLOAD_TOKEN_SECRET || 'default-secret';
    const signature = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(payload))
        .digest('hex');

    return Buffer.from(JSON.stringify({ ...payload, sig: signature })).toString('base64');
}

/**
 * Validate download token
 */
export function validateDownloadToken(token: string): { valid: boolean; fileId?: string } {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        const { fileId, exp, sig, ...payload } = decoded;

        // Check expiration
        if (Date.now() / 1000 > exp) {
            return { valid: false };
        }

        // Verify signature
        const secret = process.env.DOWNLOAD_TOKEN_SECRET || 'default-secret';
        const expectedSig = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify({ ...payload, fileId, exp }))
            .digest('hex');

        return {
            valid: sig === expectedSig,
            fileId: sig === expectedSig ? fileId : undefined
        };
    } catch {
        return { valid: false };
    }
}

/**
 * Encrypt file buffer
 */
export function encryptFile(buffer: Buffer, key: string): { encrypted: Buffer; iv: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);

    const encrypted = Buffer.concat([
        cipher.update(buffer),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
        encrypted: Buffer.concat([iv, authTag, encrypted]),
        iv: iv.toString('hex')
    };
}

/**
 * Decrypt file buffer
 */
export function decryptFile(encryptedBuffer: Buffer, key: string): Buffer {
    const iv = encryptedBuffer.subarray(0, 16);
    const authTag = encryptedBuffer.subarray(16, 32);
    const encrypted = encryptedBuffer.subarray(32);

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);
}

/**
 * Generate unique file ID
 */
export function generateFileId(): string {
    return uuidv4().replace(/-/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Get file icon based on file type
 */
export function getFileIcon(fileType: string): string {
    const icons: Record<string, string> = {
        'image': '🖼️',
        'video': '🎬',
        'audio': '🎵',
        'pdf': '📄',
        'zip': '📦',
        'text': '📝',
        'code': '💻',
        'document': '📋',
        'spreadsheet': '📊',
        'presentation': '📽️'
    };

    if (fileType.startsWith('image/')) return icons.image;
    if (fileType.startsWith('video/')) return icons.video;
    if (fileType.startsWith('audio/')) return icons.audio;
    if (fileType.includes('pdf')) return icons.pdf;
    if (fileType.includes('zip') || fileType.includes('compressed')) return icons.zip;
    if (fileType.includes('text')) return icons.text;
    if (fileType.includes('javascript') || fileType.includes('typescript') || fileType.includes('python')) return icons.code;
    if (fileType.includes('word')) return icons.document;
    if (fileType.includes('excel')) return icons.spreadsheet;
    if (fileType.includes('powerpoint')) return icons.presentation;

    return '📎';
}

/**
 * Calculate expiry date
 */
export function calculateExpiryDate(days = 7): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}