import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get a unique file name
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    
    // Save to public/uploads
    // Note: On serverless platforms like Vercel, this will not persist across deployments or function instances.
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, error: "Error uploading file." }, { status: 500 });
  }
}
