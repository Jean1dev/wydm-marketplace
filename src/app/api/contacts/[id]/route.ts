import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/db';
import { contacts, seller } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sellerRecord = await db.select().from(seller).where(eq(seller.name, session.user.email)).limit(1);
    
    if (sellerRecord.length === 0) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const contactToDelete = await db.select().from(contacts).where(
      and(
        eq(contacts.id, parseInt(id)),
        eq(contacts.sellerFk, sellerRecord[0].id)
      )
    ).limit(1);

    if (contactToDelete.length === 0) {
      return NextResponse.json({ error: 'Contact not found or not authorized' }, { status: 404 });
    }

    await db.delete(contacts).where(eq(contacts.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 