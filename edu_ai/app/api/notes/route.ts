import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { fileId } = await request.json();
    return NextResponse.json({ success: true, message: `Processing file ${fileId}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
