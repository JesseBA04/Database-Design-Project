import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`
      SELECT
        r."Restaurant_id",
        r."Name",
        r."Food_Category",
        r."Price_Category",
        r."YouPass_eligible",
        (SELECT l."Address"
         FROM "Locations" l
         WHERE l."Restaurant_id" = r."Restaurant_id"
         LIMIT 1) AS primary_address
      FROM "Restaurants" r
      ORDER BY r."Name"
    `;

    const restaurants = rows.map((row) => ({
      restaurantId: row.Restaurant_id,
      name: row.Name,
      foodCategory: row.Food_Category,
      priceCategory: row.Price_Category,
      youPassEligible: row.YouPass_eligible,
      primaryAddress: row.primary_address,
    }));

    return NextResponse.json({ restaurants });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
