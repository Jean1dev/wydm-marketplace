import { db } from '@/db';
import { tableViews } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface IncrementPostViewsRequest {
    postId: number;
}

export async function incrementPostViews(request: IncrementPostViewsRequest): Promise<void> {
    try {
        const { postId } = request;
        const existingView = await db
            .select()
            .from(tableViews)
            .where(eq(tableViews.postId, postId))
            .limit(1);

        if (existingView.length > 0) {
            await db
                .update(tableViews)
                .set({ contadorViews: existingView[0].contadorViews + 1 })
                .where(eq(tableViews.postId, postId));
        } else {
            await db
                .insert(tableViews)
                .values({
                    postId,
                    contadorViews: 1
                });
        }

    } catch (error) {
    }
}
