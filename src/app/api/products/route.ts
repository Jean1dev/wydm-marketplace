import { NextResponse } from 'next/server';
import { getAllProducts } from '@/db/queries/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 