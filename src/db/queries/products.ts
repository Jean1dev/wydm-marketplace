import { db } from '@/db';
import { products } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function getAllProducts() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    
    return allProducts;
  } catch {
    throw new Error('Failed to fetch products');
  }
} 