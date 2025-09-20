import { NextRequest } from 'next/server';
import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const ENCODED_SECRET = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload extends JWTPayload {
  userId: number | string;
  email: string;
}

export interface AuthResult {
  isAuthenticated: boolean;
  userId?: number | string;
  email?: string;
}

export const generateToken = async (payload: TokenPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(ENCODED_SECRET);
};

export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, ENCODED_SECRET);
    const { userId, email } = payload;

    if (!userId || !email) {
      return null;
    }

    return { userId, email };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const verifyAuth = async (request: NextRequest): Promise<AuthResult> => {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    console.error('Authentication verification error:', error);
    return { isAuthenticated: false };
  }
};
