// app/legal/terms/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
                        <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
                        <p className="text-xs text-gray-500 mt-1">Last updated: December 14, 2025</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-sm max-w-none text-gray-700">
                    <p className="text-sm mb-6">
                        By using Transfer.zip, you agree to these terms. These terms govern your use of our file transfer service.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Service Description</h2>
                    <p className="text-sm mb-6">
                        Transfer.zip provides temporary file transfer services. Files are encrypted and automatically deleted after expiration.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. Acceptable Use</h2>
                    <p className="text-sm mb-4">
                        You agree to use our service responsibly and lawfully.
                    </p>
                    <div className="bg-gray-50 rounded p-4 mb-6">
                        <p className="text-sm font-medium text-gray-900 mb-2">You must not:</p>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                            <li>Upload illegal or harmful content</li>
                            <li>Share copyrighted material without permission</li>
                            <li>Attempt to disrupt or hack our service</li>
                            <li>Use our service for spam or phishing</li>
                        </ul>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
                    <ul className="text-sm list-disc pl-5 mb-6 space-y-1">
                        <li>You are responsible for files you upload</li>
                        <li>Keep your account credentials secure</li>
                        <li>Comply with all applicable laws</li>
                        <li>Files may be removed if they violate these terms</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
                    <p className="text-sm mb-6">
                        You retain ownership of your files. You grant us a limited license to store and transmit your files only to provide the service.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Disclaimer</h2>
                    <p className="text-sm mb-4">
                        Service is provided "as is" without warranties. We don't guarantee:
                    </p>
                    <ul className="text-sm list-disc pl-5 mb-6 space-y-1">
                        <li>Continuous availability</li>
                        <li>Data loss prevention</li>
                        <li>Specific performance levels</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
                    <p className="text-sm mb-6">
                        We're not liable for indirect or consequential damages. Total liability is limited to fees paid in last 6 months.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. Termination</h2>
                    <p className="text-sm mb-6">
                        We may suspend or terminate accounts that violate these terms or threaten service security.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">8. Changes</h2>
                    <p className="text-sm mb-6">
                        We may update these terms. Continued use after changes means acceptance.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">9. Governing Law</h2>
                    <p className="text-sm mb-6">
                        These terms are governed by Delaware, US law.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">10. Contact</h2>
                    <p className="text-sm">
                        Questions? Email <a href="mailto:legal@transfer.zip" className="text-blue-600 hover:underline">legal@transfer.zip</a>
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