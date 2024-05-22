import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function DELETE(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    const result = await sql`
      SELECT products FROM carts
      WHERE user_id = ${Number(userId)}
    `;

    if (typeof result.rows[0].products === "string") {
      result.rows[0].products = JSON.parse(result.rows[0].products);
    }

    if (result.rows[0].products[productId]) {
      delete result.rows[0].products[productId];
    }

    const updatedCart = await sql`
      UPDATE carts
      SET products = ${JSON.stringify(result.rows[0].products)}::jsonb
      WHERE user_id = ${Number(userId)}
      RETURNING *
    `;

    return NextResponse.json({ updatedCart }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
