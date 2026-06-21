import { NextResponse } from "next/server";
import { saveEvent, saveIntake } from "@/src/lib/store";
import type { IntakePayload } from "@/src/lib/types";
import { sendValidationWebhook } from "@/src/lib/webhook";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<IntakePayload>;

    if (!payload.idea || !payload.locale || !payload.product_stage) {
      return NextResponse.json(
        { error: "Missing required fields: idea, locale, product_stage" },
        { status: 400 }
      );
    }

    const intake = saveIntake(payload as IntakePayload);
    saveEvent({
      name: "intake_completed",
      locale: intake.locale,
      properties: {
        intakeId: intake.id,
        stage: intake.product_stage,
        source: intake.source,
        variant: intake.variant
      }
    });
    await sendValidationWebhook("intake_completed", { intake });

    return NextResponse.json({ intake });
  } catch {
    return NextResponse.json({ error: "Invalid intake payload" }, { status: 400 });
  }
}
