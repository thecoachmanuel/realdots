import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      const token = await new SignJWT({ role: 'admin', email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
