import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validPassword) {
      return NextResponse.json(
        { success: false, error: "ADMIN_PASSWORD is not configured" },
        { status: 500 }
      );
    }

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true, token: validPassword });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("[admin/login] error", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
