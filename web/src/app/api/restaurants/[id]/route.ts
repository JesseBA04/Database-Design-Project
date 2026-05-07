import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid restaurant ID' }, { status: 400 });
  }

  try {
    // Restaurant info
    const restaurantRows = await sql`
      SELECT "Restaurant_id", "Name", "Food_Category", "Price_Category",
             "YouPass_eligible"
      FROM "Restaurants" WHERE "Restaurant_id" = ${id}
    `;

    if (restaurantRows.length === 0) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    const r = restaurantRows[0];
    const restaurant = {
      restaurantId: r.Restaurant_id,
      name: r.Name,
      foodCategory: r.Food_Category,
      priceCategory: r.Price_Category,
      youPassEligible: r.YouPass_eligible,
    };

    // All locations
    const locationRows = await sql`
      SELECT "Address", "Operating_hours" FROM "Locations"
      WHERE "Restaurant_id" = ${id}
    `;
    const locations = locationRows.map((l) => ({
      address: l.Address,
      operatingHours: l.Operating_hours,
    }));

    // Menu items
    const menuRows = await sql`
      SELECT
        fi."Food_Item_id",
        fi."Item Name" AS item_name,
        fi."Item Description" AS item_description,
        fi."Allergy Information" AS allergy_information,
        fi."Preparation Edits" AS preparation_edits,
        fi."Price"
      FROM "Menu" m
      JOIN "Food_Item_Info" fi ON m."Food_Item_id" = fi."Food_Item_id"
      WHERE m."Restaurant_id" = ${id}
      ORDER BY fi."Food_Item_id"
    `;
    const menu = menuRows.map((m) => ({
      foodItemId: m.Food_Item_id,
      itemName: m.item_name,
      itemDescription: m.item_description,
      allergyInformation: m.allergy_information,
      preparationEdits: m.preparation_edits,
      price: m.Price != null ? Number(m.Price) : null,
    }));

    // Reviews with reviewer name
    const reviewRows = await sql`
      SELECT
        r."Stars",
        r."Review_text",
        r."Food_Item_id",
        fi."Item Name" AS item_name,
        upi."Name" AS reviewer_name
      FROM "Review" r
      LEFT JOIN "User_profile_information" upi ON r."User_id" = upi."User_id"
      LEFT JOIN "Food_Item_Info" fi ON r."Food_Item_id" = fi."Food_Item_id"
      WHERE r."Restaurant_id" = ${id}
      ORDER BY r."Stars" DESC
    `;
    const reviews = reviewRows.map((rv) => ({
      stars: rv.Stars,
      reviewText: rv.Review_text,
      foodItemId: rv.Food_Item_id,
      itemName: rv.item_name,
      reviewerName: rv.reviewer_name,
    }));

    return NextResponse.json({ restaurant, locations, menu, reviews });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
