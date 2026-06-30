import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

async function getUserFromToken(request) {
  const token = request.cookies.get('user_token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const payload = await getUserFromToken(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await dbConnect();
  const user = await User.findById(payload.userId).select('-password');
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ success: true, user: JSON.parse(JSON.stringify(user)) });
}

export async function PUT(request) {
  const payload = await getUserFromToken(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, email, phone, avatar, currentPassword, newPassword } = await request.json();

    await dbConnect();
    const user = await User.findById(payload.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Check email uniqueness if changed
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) return NextResponse.json({ error: 'Email already in use by another account' }, { status: 409 });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;

    // Handle password change
    if (newPassword) {
      if (!currentPassword) return NextResponse.json({ error: 'Current password is required to set a new password' }, { status: 400 });
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      if (newPassword.length < 6) return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      user.password = await bcrypt.hash(newPassword, 12);
    }

    await user.save();

    const updated = { id: user._id.toString(), name: user.name, email: user.email, avatar: user.avatar, phone: user.phone };
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
