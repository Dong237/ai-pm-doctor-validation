import { NextResponse } from "next/server";
import { createDiagnosis } from "@/src/lib/diagnose";
import { getStore, saveDiagnosis, saveEvent, saveIntake } from "@/src/lib/store";
import type { IntakePayload } from "@/src/lib/types";
import { sendValidationWebhook } from "@/src/lib/webhook";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      intakeId?: string;
      intake?: IntakePayload;
    };
    const store = getStore();

    let intake = body.intakeId ? store.intakes.get(body.intakeId) : undefined;
    if (!intake && body.intake?.idea && body.intake.locale && body.intake.product_stage) {
      intake = saveIntake(body.intake);
    }

    if (!intake) {
      return NextResponse.json({ error: "No valid intake found" }, { status: 400 });
    }

    const diagnosis = saveDiagnosis(createDiagnosis(intake));
    saveEvent({
      name: "diagnosis_preview_generated",
      locale: diagnosis.locale,
      properties: {
        intakeId: intake.id,
        diagnosisId: diagnosis.id,
        evidence_strength: diagnosis.evidence_strength,
        decision_preview: diagnosis.decision,
        prd_gate: diagnosis.prd_gate
      }
    });
    await sendValidationWebhook("diagnosis_preview_generated", { intake, diagnosis });

    return NextResponse.json({ diagnosis, reportUrl: `/report/${diagnosis.id}` });
  } catch {
    return NextResponse.json({ error: "Invalid diagnosis request" }, { status: 400 });
  }
}
