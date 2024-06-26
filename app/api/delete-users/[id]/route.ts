import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/delete-users/", "");

  try {
    if (!id) throw new Error("ID is required");

    await sql`DELETE FROM users WHERE id = ${Number(id)}`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const users = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users }, { status: 200 });
}
