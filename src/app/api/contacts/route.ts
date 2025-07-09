import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/db';
import { contacts, seller } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sellerRecord = await db.select().from(seller).where(eq(seller.name, session.user.email)).limit(1);
    
    if (sellerRecord.length === 0) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const sellerContacts = await db.select().from(contacts).where(eq(contacts.sellerFk, sellerRecord[0].id));
    
    return NextResponse.json(sellerContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, value } = await request.json();
    
    if (!type || !value) {
      return NextResponse.json({ error: 'Type and value are required' }, { status: 400 });
    }

    const sellerRecord = await db.select().from(seller).where(eq(seller.name, session.user.email)).limit(1);
    
    if (sellerRecord.length === 0) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    await db.insert(contacts).values({
      type,
      value,
      sellerFk: sellerRecord[0].id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 