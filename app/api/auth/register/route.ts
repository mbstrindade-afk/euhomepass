import { NextResponse } from 'next/server';
import { UserRepository, UserCredentials } from '../../../../lib/db';

export async function POST(request: Request) {
  console.log('API: Register endpoint called');
  
  try {
    const body: UserCredentials = await request.json();
    console.log('API: Register request body:', { email: body.email, passwordLength: body.password?.length || 0 });
    
    // Validate input
    if (!body.email || !body.password) {
      console.log('API: Register validation failed - missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = UserRepository.findByEmail(body.email);
    console.log('API: Existing user check:', { exists: !!existingUser });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    console.log('API: Attempting to create user');
    const newUser = UserRepository.create(body);
    console.log('API: User creation result:', { success: !!newUser });
    
    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Return success response without sensitive data
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}