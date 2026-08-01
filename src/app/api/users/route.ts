import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://127.0.0.1:8000/users", {
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const response = await fetch("http://127.0.0.1:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
