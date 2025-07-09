import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/db';
import { products, seller, Seller } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function validateAuthentication() {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error('Unauthorized - User must be authenticated');
  }
  return session;
}

function validateRequestData(body: any) {
  const { name, category, amount, quantity, description, sellerName, sellerFk } = body;
  
  if (!name || !category || !amount || !sellerName || !sellerFk) {
    throw new Error('Missing required fields');
  }
  
  return { name, category, amount, quantity, description, sellerName, sellerFk };
}

async function findOrCreateSeller(email: string, userName: string) {
  const existingSeller = await db
    .select()
    .from(seller)
    .where(eq(seller.name, email))
    .limit(1);

  if (existingSeller.length > 0) {
    return existingSeller[0];
  }

  await db.insert(seller).values({
    name: email,
    wydNickname: userName || 'Usuário',
    totalSells: 0,
    totalReviews: 0,
    reputation: 0,
  });

  const createdSeller = await db
    .select()
    .from(seller)
    .where(eq(seller.name, email))
    .limit(1);

  if (createdSeller.length === 0) {
    throw new Error('Failed to create seller');
  }

  return createdSeller[0];
}

async function createProduct(productData: any, seller: Seller) {
  return await db.insert(products).values({
    name: productData.name,
    category: productData.category,
    amount: productData.amount,
    quantity: productData.quantity || 0,
    sellerName: seller.wydNickname,
    sellerReputation: seller.reputation,
    sellerFk: seller.id,
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await validateAuthentication();
    const email = session.user.email;
    
    if (!email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const productData = validateRequestData(body);

    const seller = await findOrCreateSeller(email, session.user.name || 'Usuário');

    const newProduct = await createProduct(productData, seller);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
    const statusCode = errorMessage.includes('Unauthorized') ? 401 : 
                      errorMessage.includes('Missing') ? 400 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 