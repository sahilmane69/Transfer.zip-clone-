"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Upload, Zap, Lock, TrendingUp, Star, ChevronDown } from "lucide-react";
import gsap from "gsap";

export default function HomePage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProductMenu, setShowProductMenu] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Navbar appears after scrolling past the hero section
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP Typing Animation
    useEffect(() => {
        if (titleRef.current) {
            const text = "Send Big Files Without Limits";
            const words = text.split(" ");
            titleRef.current.innerHTML = "";

            words.forEach((word) => {
                const wordSpan = document.createElement("span");
                wordSpan.style.display = "inline-block";
                wordSpan.style.marginRight = "0.3em";

                word.split("").forEach((char) => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.opacity = "0";
                    span.style.display = "inline-block";
                    wordSpan.appendChild(span);
                });

                titleRef.current?.appendChild(wordSpan);
            });

            // Animate each character
            const chars = titleRef.current.querySelectorAll("span span");
            gsap.fromTo(
                chars,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: "power2.out",
                }
            );
        }
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Floating Navbar - Only appears after scroll */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/logo.webp"
                                    alt="Transfer.zip Logo"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                                <span className="font-semibold text-lg text-gray-900">
                  Transfer.zip
                </span>
                            </Link>

                            {/* Navigation Menu */}
                            <div className="hidden md:flex items-center gap-8">
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setShowProductMenu(true)}
                                        onMouseLeave={() => setShowProductMenu(false)}
                                        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                                    >
                                        Product
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {showProductMenu && (
                                        <div
                                            onMouseEnter={() => setShowProductMenu(true)}
                                            onMouseLeave={() => setShowProductMenu(false)}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                                        >
                                            <Link href="#features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                Features
                                            </Link>
                                            <Link href="#pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                Pricing
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
                                    Pricing
                                </Link>

                                <Link href="/legal/privacy-policy" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
                                    Privacy
                                </Link>
                            </div>

                            <Link
                                href="/dashboard"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                                My Transfers →
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Static Top Navbar (always visible) */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.webp"
                                alt="Transfer.zip Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="font-semibold text-lg text-gray-900">
                Transfer.zip
              </span>
                        </Link>

                        {/* Navigation Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setShowProductMenu(true)}
                                    onMouseLeave={() => setShowProductMenu(false)}
                                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                                >
                                    Product
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showProductMenu && (
                                    <div
                                        onMouseEnter={() => setShowProductMenu(true)}
                                        onMouseLeave={() => setShowProductMenu(false)}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                                    >
                                        <Link href="#features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Features
                                        </Link>
                                        <Link href="#pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Pricing
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
                                Pricing
                            </Link>

                            <Link href="/legal/privacy-policy" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
                                Privacy
                            </Link>
                        </div>

                        <Link
                            href="/dashboard"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                            My Transfers →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="pt-20 pb-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Left side - Text content */}
                        <div className="pt-16">
                            <h1
                                ref={titleRef}
                                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
                            >
                                Send Big Files Without Limits
                            </h1>

                            <div className="space-y-2 mb-10">
                                <p className="text-lg text-gray-600">
                                    Ultrafast, Reliable and Secure file transfers.
                                </p>
                                <p className="text-lg text-gray-600">
                                    No throttling. No size limits.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-4">
                                <Link
                                    href="/dashboard"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
                                >
                                    My Transfers →
                                </Link>

                                <a
                                    href="https://github.com/robinkarlberg/transfer.zip-web"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium inline-flex items-center gap-2"
                                >
                                    <Star className="w-5 h-5" />
                                    Star on GitHub (1400)
                                </a>
                            </div>
                        </div>

                        {/* Right side - Upload box */}
                        <div className="pt-16">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Header tab */}
                                <div className="flex border-b border-gray-200">
                                    <button className="flex-1 px-6 py-3 text-sm font-medium text-gray-600 bg-white border-b-2 border-blue-600 flex items-center justify-center gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19 15V21M19 21L17 19M19 21L21 19M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H14M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Receive files
                                    </button>
                                </div>

                                {/* Upload area */}
                                <div className="p-12">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                                            <svg
                                                className="w-8 h-8 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Pick files
                                        </h3>
                                        <p className="text-gray-500 text-base underline">
                                            or select a folder
                                        </p>
                                    </div>

                                    {/* Footer text */}
                                    <div className="mt-8 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            End-to-end encrypted, files not stored.
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Want to store your files?{" "}
                                            <Link
                                                href="/signin"
                                                className="text-gray-900 underline hover:text-gray-700"
                                            >
                                                Sign up
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold mb-2 text-sm">
                            Why Choose Us?
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Blazingly Fast. No Nonsense.
                        </h2>
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Say goodbye to slow uploads, size limits, and expensive pricing. Transfer.zip makes file sharing seamless without breaking the bank.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Custom Branding</h3>
                                <p className="text-gray-600 text-sm">
                                    Make every transfer your own. Add your logo and background for a more professional look.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Reliable Uploads</h3>
                                <p className="text-gray-600 text-sm">
                                    Connection dropped? No problem. Uploads retry in the background until they're done.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Statistics</h3>
                                <p className="text-gray-600 text-sm">
                                    See when your files are downloaded and when your links are clicked, with simple stats.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Fully Open Source</h3>
                                <p className="text-gray-600 text-sm">
                                    All source code is open source on GitHub. <a href="https://github.com/robinkarlberg/transfer.zip-web" className="text-blue-600 hover:underline">Check it Out →</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-16 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Pricing</h2>
                        <p className="text-base text-gray-600">
                            Less to Spend, More to Send.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Free</h3>
                            <div className="mb-3">
                                <span className="text-4xl font-bold text-gray-400">$0</span>
                            </div>
                            <p className="text-gray-700 mb-6 text-sm">
                                Quick transfers with no account needed
                            </p>
                            <ul className="space-y-2.5 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">No file size limit</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">End-to-end encrypted</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">No account required</span>
                                </li>
                            </ul>
                            <Link
                                href="/dashboard"
                                className="block w-full text-center bg-gray-100 text-gray-900 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
                            >
                                Start for Free
                            </Link>
                        </div>

                        {/* Starter Plan */}
                        <div className="bg-white rounded-2xl p-7 shadow-xl border-2 border-blue-600 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Starter</h3>
                            <div className="mb-3">
                                <span className="text-4xl font-bold text-gray-900">$9</span>
                                <span className="text-base text-gray-900 font-semibold">/month</span>
                            </div>
                            <p className="text-gray-700 mb-6 text-sm">
                                For personal use and quick file sharing
                            </p>
                            <ul className="space-y-2.5 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-900 font-medium">Unlimited transfers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Up to 200GB per transfer</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Files expire after 14 days</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Track views and downloads</span>
                                </li>
                            </ul>
                            <Link
                                href="/signin"
                                className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Pro</h3>
                            <div className="mb-3">
                                <span className="text-4xl font-bold text-gray-900">$19</span>
                                <span className="text-base text-gray-900 font-semibold">/month</span>
                            </div>
                            <p className="text-gray-700 mb-6 text-sm">
                                For power users & professionals
                            </p>
                            <ul className="space-y-2.5 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-900 font-medium">Up to 1TB per transfer</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Files stay for 365 days</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Send to 30 emails</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                    <span className="text-sm text-gray-500">Custom branding</span>
                                </li>
                            </ul>
                            <Link
                                href="/signin"
                                className="block w-full text-center bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition font-semibold text-sm"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 Transfer Clone. Built for learning purposes.
                    </p>
                </div>
            </footer>
        </div>
    );
}