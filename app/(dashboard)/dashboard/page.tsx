"use client";

import { Upload, Link as LinkIcon, Mail } from "lucide-react";
import FileUploader from "@/app/components/FileUploader";

export default function DashboardPage() {
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
                    <FileUploader />

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            <Upload className="w-5 h-5" />
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
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Storage Used</h3>
                            <span className="text-2xl">📦</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0 GB</p>
                        <p className="text-sm text-gray-500 mt-1">of 200 GB</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Active Transfers</h3>
                            <span className="text-2xl">📤</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-500 mt-1">transfers active</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-700">Total Downloads</h3>
                            <span className="text-2xl">📥</span>
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
                        <Upload className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No transfers yet. Upload your first file to get started!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}