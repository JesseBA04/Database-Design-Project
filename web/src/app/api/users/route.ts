import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`
      SELECT u."User_id", upi."Name", u."YouPass_status"
      FROM "Users" u
      LEFT JOIN "User_profile_information" upi
        ON u."User_id" = upi."User_id"
      ORDER BY u."User_id"
    `;

    const users = rows.map((row) => ({
      userId: row.User_id,
      name: row.Name,
      youPassStatus: row.YouPass_status,
    }));

    return NextResponse.json({ users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
