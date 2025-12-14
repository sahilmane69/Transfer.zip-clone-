import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
        return NextResponse.json(
            { error: "No file provided" },
            { status: 400 }
        )
    }

    // validation
    const MAX_SIZE = 100 * 1024 * 1024 // 100MB
    if (file.size > MAX_SIZE) {
        return NextResponse.json(
            { error: "File too large" },
            { status: 400 }
        )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "uploads")
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    const filePath = path.join(uploadDir, file.name)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({
        success: true,
        name: file.name,
        size: file.size,
    })
}
