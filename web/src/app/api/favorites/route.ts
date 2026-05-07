import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get('userId'));
  const restaurantId = Number(searchParams.get('restaurantId'));

  if (isNaN(userId) || isNaN(restaurantId)) {
    return NextResponse.json(
      { error: 'userId and restaurantId are required and must be numbers' },
      { status: 400 }
    );
  }

  try {
    const rows = await sql`
      SELECT 1 FROM "Favorited_Restaurants"
      WHERE "User_id" = ${userId} AND "Restaurant_id" = ${restaurantId}
    `;
    return NextResponse.json({ favorited: rows.length > 0 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const postSchema = z.object({
  userId: z.number(),
  restaurantId: z.number(),
  favorited: z.boolean(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = postSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues.map((i) => i.message).join(', ') },
      { status: 400 }
    );
  }

  const { userId, restaurantId, favorited } = result.data;

  try {
    if (favorited) {
      // Insert if not already exists
      await sql`
        INSERT INTO "Favorited_Restaurants" ("User_id", "Restaurant_id")
        VALUES (${userId}, ${restaurantId})
        ON CONFLICT DO NOTHING
      `;
    } else {
      await sql`
        DELETE FROM "Favorited_Restaurants"
        WHERE "User_id" = ${userId} AND "Restaurant_id" = ${restaurantId}
      `;
    }
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
