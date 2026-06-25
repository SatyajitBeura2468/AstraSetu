import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(
    {
      ok: true,
      data,
      generatedAt: new Date().toISOString(),
    },
    init,
  );
}

export function fail(message: string, status = 500) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      generatedAt: new Date().toISOString(),
    },
    { status },
  );
}
