// app/auth/layout.tsx
"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Image
                                src="/logo.webp"
                                alt="Transfer.zip Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                            <span className="ml-2 text-xl font-bold text-gray-900">Transfer.zip</span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex items-center space-x-6">
                            <a href="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                                Features
                            </a>
                            <a href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                                Pricing
                            </a>
                            <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                                About
                            </a>
                            <a
                                href="/contact"
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Image
                                src="/logo.webp"
                                alt="Transfer.zip Logo"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                            <span className="ml-2 text-sm text-gray-600">© 2024 Transfer.zip. All rights reserved.</span>
                        </div>
                        <div className="flex space-x-6">
                            <a href="/legal/terms" className="text-sm text-gray-600 hover:text-gray-900 transition">
                                Terms
                            </a>
                            <a href="/legal/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">
                                Privacy
                            </a>
                            <a href="/legal/cookies" className="text-sm text-gray-600 hover:text-gray-900 transition">
                                Cookies
                            </a>
                            <a href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition">
                                Security
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}