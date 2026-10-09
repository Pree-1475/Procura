import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { compare } from 'bcryptjs';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log("Login attempt for email:", email);
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      console.log("Admin not found for email:", email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log("Admin found. Checking password...");
    const isPasswordValid = await compare(password, admin.password);

    if (!isPasswordValid) {
      console.log("Password comparison failed for:", email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    console.log("Password is valid. Setting session...");

    await setSession(admin.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
