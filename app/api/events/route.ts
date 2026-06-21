import { NextResponse } from "next/server";
import { saveEvent } from "@/src/lib/store";
import type { Locale } from "@/src/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      locale?: Locale;
      properties?: Record<string, unknown>;
    };

    if (!body.name) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    const event = saveEvent({
      name: body.name,
      locale: body.locale,
      properties: body.properties
    });

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }
}
