"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <Image
                                src="/img.png"
                                alt="Transfer.zip Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-lg"
                            />
                            <span className="text-lg font-semibold text-gray-900">Transfer.zip</span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                href="/#features"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                            >
                                Features
                            </Link>
                            <Link
                                href="/#pricing"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/legal/privacy-policy"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                            >
                                Privacy
                            </Link>
                        </nav>

                        {/* CTA Button */}
                        <Link
                            href="/"
                            className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 py-12">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200/60 bg-white/50 backdrop-blur-sm mt-auto">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Logo & Copyright */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/img.png"
                                alt="Transfer.zip Logo"
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded"
                            />
                            <span className="text-sm text-gray-500">
                                © 2024 Transfer.zip. All rights reserved.
                            </span>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link
                                href="/legal/terms"
                                className="text-sm text-gray-600 hover:text-gray-900 transition"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/legal/privacy-policy"
                                className="text-sm text-gray-600 hover:text-gray-900 transition"
                            >
                                Privacy Policy
                            </Link>
                            <a
                                href="mailto:support@transfer.zip"
                                className="text-sm text-gray-600 hover:text-gray-900 transition"
                            >
                                Support
                            </a>
                            <a
                                href="https://github.com/robinkarlberg/transfer.zip-web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 hover:text-gray-900 transition inline-flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-6 pt-6 border-t border-gray-200/60 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>256-bit SSL Encryption • End-to-end Encrypted</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}