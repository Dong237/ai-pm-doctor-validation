import { NextResponse } from "next/server";
import { saveEvent, saveLead } from "@/src/lib/store";
import type { Locale } from "@/src/lib/types";
import { sendValidationWebhook } from "@/src/lib/webhook";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      locale?: Locale;
      idea?: string;
      intakeId?: string;
      diagnosisId?: string;
      source?: string;
      variant?: string;
    };

    if (!body.email || !body.locale) {
      return NextResponse.json({ error: "Missing email or locale" }, { status: 400 });
    }

    const lead = saveLead({
      email: body.email,
      locale: body.locale,
      idea: body.idea,
      intakeId: body.intakeId,
      diagnosisId: body.diagnosisId,
      source: body.source,
      variant: body.variant
    });

    saveEvent({
      name: "email_submitted",
      locale: lead.locale,
      properties: {
        leadId: lead.id,
        intakeId: lead.intakeId,
        diagnosisId: lead.diagnosisId,
        source: lead.source,
        variant: lead.variant
      }
    });
    await sendValidationWebhook("email_submitted", { lead });

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }
}
