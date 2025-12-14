// app/legal/privacy-policy/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Minimal Header */}
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition mb-8"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="relative w-6 h-6">
                            <Image
                                src="/logo.webp"
                                alt="Transfer.zip Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-900">transfer.zip</span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                        <p className="text-xs text-gray-500 mt-1">Last updated: December 14, 2025</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-sm max-w-none text-gray-700">
                    <p className="text-sm mb-6">
                        This Privacy Policy describes how Transfer.zip ("we," "us," or "our") collects, uses, and shares your information when you use our file transfer service.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
                    <p className="text-sm mb-4">
                        We collect minimal information necessary to provide our service:
                    </p>
                    <ul className="text-sm list-disc pl-5 mb-6 space-y-1">
                        <li>Email address (for account creation)</li>
                        <li>IP address and device information</li>
                        <li>File metadata (name, size, type)</li>
                        <li>Transfer logs and timestamps</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. How We Use Information</h2>
                    <ul className="text-sm list-disc pl-5 mb-6 space-y-1">
                        <li>Provide and secure file transfer services</li>
                        <li>Generate secure download links</li>
                        <li>Prevent abuse and ensure service integrity</li>
                        <li>Improve service performance</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. Data Security</h2>
                    <p className="text-sm mb-4">
                        Files are encrypted during transfer and storage. We do not access file contents.
                    </p>
                    <p className="text-sm mb-6">
                        Files are automatically deleted after their expiration period.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
                    <p className="text-sm mb-6">
                        We do not sell your data. We only share information with trusted service providers necessary to operate our service, and when required by law.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
                    <p className="text-sm mb-4">
                        You have the right to:
                    </p>
                    <ul className="text-sm list-disc pl-5 mb-6 space-y-1">
                        <li>Access your personal information</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of non-essential communications</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Changes</h2>
                    <p className="text-sm mb-6">
                        We may update this policy. Significant changes will be communicated via email or service notification.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. Contact</h2>
                    <p className="text-sm">
                        Questions? Email <a href="mailto:privacy@transfer.zip" className="text-blue-600 hover:underline">privacy@transfer.zip</a>
                    </p>
                </div>

                {/* Minimal Footer */}
                <div className="mt-12 pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-5 h-5">
                                <Image
                                    src="/logo.webp"
                                    alt="Transfer.zip Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs text-gray-600">© 2025 Transfer.zip</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <Link href="/legal/terms" className="hover:text-gray-700 transition">Terms</Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/legal/privacy-policy" className="hover:text-gray-700 transition">Privacy</Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/contact" className="hover:text-gray-700 transition">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}