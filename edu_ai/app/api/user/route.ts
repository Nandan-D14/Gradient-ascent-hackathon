import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Dummy user data
  return NextResponse.json({
    success: true,
    user: {
      name: 'Test User',
      email: 'test@example.com'
    }
  });
}
