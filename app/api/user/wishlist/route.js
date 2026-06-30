import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Property from '@/models/Property'; // Ensure Property model is loaded

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
  // Ensure we load the Property model so populate works
  await Property.init();
  
  const user = await User.findById(payload.userId).populate('wishlist').lean();
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Use JSON parse/stringify to handle ObjectIds safely
  return NextResponse.json({ success: true, wishlist: JSON.parse(JSON.stringify(user.wishlist || [])) });
}

export async function POST(request) {
  const payload = await getUserFromToken(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { propertyId } = await request.json();
    if (!propertyId) return NextResponse.json({ error: 'propertyId is required' }, { status: 400 });

    await dbConnect();
    const user = await User.findById(payload.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const exists = user.wishlist.includes(propertyId);
    if (exists) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== propertyId);
    } else {
      user.wishlist.push(propertyId);
    }
    
    await user.save();
    
    // Repopulate and return
    await user.populate('wishlist');
    
    return NextResponse.json({ success: true, wishlist: JSON.parse(JSON.stringify(user.wishlist)) });
  } catch (error) {
    console.error('Wishlist POST Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
