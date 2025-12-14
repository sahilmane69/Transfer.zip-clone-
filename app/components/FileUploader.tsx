"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, CheckCircle, AlertCircle } from "lucide-react";

interface FileWithPreview extends File {
    preview?: string;
    progress?: number;
    status?: "uploading" | "success" | "error";
    downloadUrl?: string;
}

export default function FileUploader() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const filesWithPreview = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                progress: 0,
                status: "uploading" as const,
            })
        );
        setFiles((prev) => [...prev, ...filesWithPreview]);

        // Start uploading
        uploadFiles(filesWithPreview);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    const uploadFiles = async (filesToUpload: FileWithPreview[]) => {
        setIsUploading(true);

        for (const file of filesToUpload) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                // Simulate progress (in real app, use XMLHttpRequest or axios for progress)
                const progressInterval = setInterval(() => {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.name === file.name && f.progress! < 90
                                ? { ...f, progress: f.progress! + 10 }
                                : f
                        )
                    );
                }, 200);

                // Upload to API
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                clearInterval(progressInterval);

                if (response.ok) {
                    const data = await response.json();
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.name === file.name
                                ? {
                                    ...f,
                                    progress: 100,
                                    status: "success",
                                    downloadUrl: data.downloadUrl,
                                }
                                : f
                        )
                    );
                } else {
                    throw new Error("Upload failed");
                }
            } catch (error) {
                console.error("Upload error:", error);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.name === file.name
                            ? { ...f, status: "error", progress: 0 }
                            : f
                    )
                );
            }
        }

        setIsUploading(false);
    };

    const removeFile = (fileName: string) => {
        setFiles((prev) => prev.filter((f) => f.name !== fileName));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="w-full">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-xl p-16 text-center transition-all cursor-pointer
          ${
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                }
        `}
            >
                <input {...getInputProps()} />

                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                    <Upload className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragActive ? "Drop files here" : "Pick files"}
                </h3>
                <p className="text-gray-500 text-base underline">
                    or select a folder
                </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-8 space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg">
                        {files.length} file{files.length > 1 ? "s" : ""} selected
                    </h4>

                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <File className="w-5 h-5 text-blue-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {file.status === "success" && (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                    {file.status === "error" && (
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    )}
                                    <button
                                        onClick={() => removeFile(file.name)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {file.status === "uploading" && (
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${file.progress}%` }}
                                    />
                                </div>
                            )}

                            {/* Success - Download Link */}
                            {file.status === "success" && file.downloadUrl && (
                                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-800 mb-2">
                                        ✓ Upload successful!
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={file.downloadUrl}
                                            readOnly
                                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(file.downloadUrl!)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error */}
                            {file.status === "error" && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-800">
                                        ✗ Upload failed. Please try again.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Summary */}
            {files.length > 0 && files.every((f) => f.status === "success") && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-medium">
                        🎉 All files uploaded successfully!
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                        Share the download links with anyone.
                    </p>
                </div>
            )}
        </div>
    );
}