import { NextResponse } from 'next/server';
import { UserRepository } from '../../../../lib/db';
import { generateToken } from '../../../../lib/jwt';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    const isValidCredentials = UserRepository.validateCredentials(email, password);
    if (!isValidCredentials) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Get user data
    const user = UserRepository.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate token
    const token = await generateToken({
      userId: user.id,
      email: user.email
    });

    // Create response with user data and token
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      token
    });
    
    // Set cookie on response
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
