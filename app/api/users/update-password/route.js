// This is for /api/users/update-password
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/lib/db';

export async function PUT(request) {
  try {
    const { password, id } = await request.json();
    
    if (!id || !password) {
      return NextResponse.json(
        {
          message: 'Invalid data',
        },
        { status: 400 }
      );
    }
    
    const user = await db.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updatedUser = await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      {
        message: 'Failed to update password',
        error: error.message,
      },
      { status: 500 }
    );
  }
}