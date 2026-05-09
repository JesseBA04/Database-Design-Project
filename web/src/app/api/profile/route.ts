import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUserId = searchParams.get('userId');
  const userId = Number(rawUserId);

  if (!rawUserId || !Number.isInteger(userId) || userId <= 0) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const [profileRows, addressRows, paymentRows, favoriteRows, summaryRows] =
      await Promise.all([
        sql`
          SELECT
            u."User_id",
            u."YouPass_status",
            upi."Name",
            upi."Age",
            upi."Creation_date",
            upi."Profile_picture",
            up."Notification_preferences"
          FROM "Users" u
          LEFT JOIN "User_profile_information" upi
            ON u."User_id" = upi."User_id"
          LEFT JOIN "User_preferences" up
            ON u."User_id" = up."User_id"
          WHERE u."User_id" = ${userId}
        `,
        sql`
          SELECT "Address", "Nickname", "Is_home", "Is_work"
          FROM "User_Addresses"
          WHERE "User_id" = ${userId}
        `,
        sql`
          SELECT "Issuer", "Card_number", "Card_expiration", "Card_name"
          FROM "Payment Info"
          WHERE "User_id" = ${userId}
        `,
        sql`
          SELECT
            r."Restaurant_id",
            r."Name",
            r."Food_Category",
            r."Price_Category",
            r."YouPass_eligible"
          FROM "Favorited_Restaurants" f
          JOIN "Restaurants" r ON f."Restaurant_id" = r."Restaurant_id"
          WHERE f."User_id" = ${userId}
          ORDER BY r."Name"
        `,
        sql`
          SELECT
            COUNT(*) AS order_count,
            COALESCE(SUM("Order_price"), 0) AS total_spent
          FROM "Orders"
          WHERE "User_id" = ${userId}
        `,
      ]);

    if (profileRows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const p = profileRows[0];

    const profile = {
      userId: p.User_id,
      name: p.Name,
      age: p.Age,
      creationDate: p.Creation_date,
      profilePicture: p.Profile_picture,
      youPassStatus: p.YouPass_status,
      notificationPreferences: p.Notification_preferences,
    };

    const addresses = addressRows.map((a: Record<string, unknown>) => ({
      address: a.Address,
      nickname: a.Nickname,
      isHome: a.Is_home,
      isWork: a.Is_work,
    }));

    const paymentMethods = paymentRows.map((pm: Record<string, unknown>) => {
      const cardNum = String(pm.Card_number ?? '');
      return {
        issuer: pm.Issuer,
        cardLast4: cardNum.slice(-4),
        cardExpiration: pm.Card_expiration,
        cardName: pm.Card_name,
      };
    });

    const favoriteRestaurants = favoriteRows.map(
      (r: Record<string, unknown>) => ({
        restaurantId: r.Restaurant_id,
        name: r.Name,
        foodCategory: r.Food_Category,
        priceCategory: r.Price_Category,
        youPassEligible: r.YouPass_eligible,
      })
    );

    const s = summaryRows[0];
    const orderSummary = {
      orderCount: Number(s.order_count),
      totalSpent: Number(s.total_spent),
    };

    return NextResponse.json({
      profile,
      addresses,
      paymentMethods,
      favoriteRestaurants,
      orderSummary,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
