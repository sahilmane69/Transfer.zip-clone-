"use client";

import { useState } from "react";
import { Link as LinkIcon, Mail } from "lucide-react";

export default function DashboardPage() {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        // TODO: Handle file upload
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log("Files dropped:", e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            console.log("Files selected:", e.target.files);
            // TODO: Handle file upload
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Quick Transfer
                    </h1>
                    <p className="text-gray-600">
                        Upload files to share instantly. No storage, maximum privacy.
                    </p>
                </div>

                {/* Main Upload Area */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                    <form
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className="space-y-4"
                    >
                        <div
                            className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all
                ${
                                dragActive
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-gray-400 bg-gray-50"
                            }
              `}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                multiple
                                onChange={handleChange}
                            />

                            {/* Upload Icon */}
                            <svg
                                version="1.1"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-16 h-16 mx-auto mb-4 ${
                                    dragActive ? "text-blue-600" : "text-gray-400"
                                }`}
                            >
                                <path
                                    d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27.7,24.8c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3 L25,23.5V28c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4.5l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l3-3.1c0,0,0,0,0,0 c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3c0,0,0,0,0,0l3,3.1C28.1,23.8,28.1,24.4,27.7,24.8z"
                                    fill="currentColor"
                                />
                                <g>
                                    <polygon points="17,2.6 17,8 22.4,8" fill="currentColor"/>
                                    <path
                                        d="M20.5,10H16c-0.6,0-1-0.4-1-1V2H4C3.4,2,3,2.4,3,3v26c0,0.6,0.4,1,1,1h12c-1.3-1.7-2-3.7-2-6c0-5.2,4-9.4,9-9.9v-1.6 C23,11.1,21.9,10,20.5,10z"
                                        fill="currentColor"
                                    />
                                </g>
                            </svg>

                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                            >
                                <p className="text-xl font-semibold text-gray-700 mb-2">
                                    Drop files here or click to browse
                                </p>
                                <p className="text-sm text-gray-500">
                                    No file size limits • End-to-end encrypted
                                </p>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                {/* Upload Icon for button */}
                                <svg
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                >
                                    <path
                                        d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27.7,24.8c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3 L25,23.5V28c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4.5l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l3-3.1c0,0,0,0,0,0 c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3c0,0,0,0,0,0l3,3.1C28.1,23.8,28.1,24.4,27.7,24.8z"
                                        fill="currentColor"
                                    />
                                    <g>
                                        <polygon points="17,2.6 17,8 22.4,8" fill="currentColor"/>
                                        <path
                                            d="M20.5,10H16c-0.6,0-1-0.4-1-1V2H4C3.4,2,3,2.4,3,3v26c0,0.6,0.4,1,1,1h12c-1.3-1.7-2-3.7-2-6c0-5.2,4-9.4,9-9.9v-1.6 C23,11.1,21.9,10,20.5,10z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                                Upload Files
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                            >
                                <LinkIcon className="w-5 h-5" />
                                Create Upload Link
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                            >
                                <Mail className="w-5 h-5" />
                                Send by Email
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Storage Used</h3>
                            <span className="text-2xl">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5 9V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V9M5 9H19M5 9V15M19 9V15M19 15V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V15M19 15H5M8 12H8.01M8 6H8.01M8 18H8.01"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0 GB</p>
                        <p className="text-sm text-gray-500 mt-1">of 200 GB</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Active Transfers</h3>
                            <span className="text-2xl">
                                <svg
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27.7,24.8c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3 L25,23.5V28c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4.5l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l3-3.1c0,0,0,0,0,0 c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3c0,0,0,0,0,0l3,3.1C28.1,23.8,28.1,24.4,27.7,24.8z"
                                        fill="currentColor"
                                    />
                                    <g>
                                        <polygon points="17,2.6 17,8 22.4,8" fill="currentColor"/>
                                        <path
                                            d="M20.5,10H16c-0.6,0-1-0.4-1-1V2H4C3.4,2,3,2.4,3,3v26c0,0.6,0.4,1,1,1h12c-1.3-1.7-2-3.7-2-6c0-5.2,4-9.4,9-9.9v-1.6 C23,11.1,21.9,10,20.5,10z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-500 mt-1">transfers active</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Total Downloads</h3>
                            <span className="text-2xl">
                                <svg
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27.7,24.6l-3,3.1c0,0,0,0,0,0c-0.1,0.1-0.2,0.2-0.3,0.2 c0,0,0,0,0,0C24.3,28,24.1,28,24,28s-0.3,0-0.4-0.1c0,0,0,0,0,0c-0.1-0.1-0.2-0.1-0.3-0.2c0,0,0,0,0,0l-3-3.1c-0.4-0.4-0.4-1,0-1.4 c0.4-0.4,1-0.4,1.4,0l1.3,1.3V20c0-0.6,0.4-1,1-1s1,0.4,1,1v4.5l1.3-1.3c0.4-0.4,1-0.4,1.4,0C28.1,23.6,28.1,24.2,27.7,24.6z"
                                        fill="currentColor"
                                    />
                                    <g>
                                        <polygon points="17,2.6 17,8 22.4,8" fill="currentColor"/>
                                        <path
                                            d="M20.5,10H16c-0.6,0-1-0.4-1-1V2H4C3.4,2,3,2.4,3,3v26c0,0.6,0.4,1,1,1h12c-1.3-1.7-2-3.7-2-6c0-5.2,4-9.4,9-9.9v-1.6 C23,11.1,21.9,10,20.5,10z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-500 mt-1">this month</p>
                    </div>
                </div>

                {/* Recent Transfers */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Recent Transfers
                    </h2>

                    <div className="text-center py-12 text-gray-500">
                        {/* Updated icon for empty state */}
                        <svg
                            version="1.1"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 mx-auto mb-3 text-gray-300"
                        >
                            <path
                                d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27.7,24.8c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3 L25,23.5V28c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4.5l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l3-3.1c0,0,0,0,0,0 c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3c0,0,0,0,0,0l3,3.1C28.1,23.8,28.1,24.4,27.7,24.8z"
                                fill="currentColor"
                            />
                            <g>
                                <polygon points="17,2.6 17,8 22.4,8" fill="currentColor"/>
                                <path
                                    d="M20.5,10H16c-0.6,0-1-0.4-1-1V2H4C3.4,2,3,2.4,3,3v26c0,0.6,0.4,1,1,1h12c-1.3-1.7-2-3.7-2-6c0-5.2,4-9.4,9-9.9v-1.6 C23,11.1,21.9,10,20.5,10z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                        <p>No transfers yet. Upload your first file to get started!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}