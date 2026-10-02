import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Reference ID is required' }, { status: 400 });
  }

  try {
    const requirement = await prisma.requirement.findUnique({
      where: { referenceId: id },
      select: {
        referenceId: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        // Notice we do NOT select internalNotes, contactEmail, etc.
        // to protect sensitive information on the public tracking page.
      }
    });

    if (!requirement) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json(requirement);
  } catch (error) {
    console.error('Error fetching requirement for tracking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
