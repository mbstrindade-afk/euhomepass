import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '../../../lib/jwt';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request);

  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Dashboard data loaded successfully',
    user: {
      id: authResult.userId,
      email: authResult.email,
    },
    stats: {
      visits: 120,
      likes: 42,
      comments: 8,
    },
  });
}
