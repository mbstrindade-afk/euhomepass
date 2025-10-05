import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    const onlyActive = searchParams.get('active') !== 'false';
    const onlyVerified = searchParams.get('verified') === 'true';

    const where: any = {};
    if (city) where.city = city;
    if (country) where.country = country;
    if (type) where.type = type;
    if (onlyActive) where.isActive = true;
    if (onlyVerified) where.isVerified = true;

    const listings = await prisma.listing.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: { listings, pagination: { total: listings.length, limit, offset, hasMore: listings.length === limit } } });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch listings' }, { status: 500 });
  }
}