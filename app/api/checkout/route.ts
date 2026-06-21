import { NextResponse } from "next/server";
import { saveEvent, savePaymentIntent } from "@/src/lib/store";
import type { Locale } from "@/src/lib/types";
import { sendValidationWebhook } from "@/src/lib/webhook";

function envLink(locale: Locale, tier: string): string | undefined {
  if (locale === "zh") {
    return undefined;
  }
  if (tier === "deep") {
    return process.env.STRIPE_PAYMENT_LINK_EN_DEEP;
  }
  return process.env.STRIPE_PAYMENT_LINK_EN_FOUNDER;
}

function amountLabel(locale: Locale, tier: string): string {
  if (locale === "zh") {
    return tier === "async" ? "¥199" : "¥499";
  }
  return tier === "deep" ? "$249" : "$99";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      locale?: Locale;
      tier?: string;
      email?: string;
      intakeId?: string;
      diagnosisId?: string;
      source?: string;
    };

    const locale = body.locale ?? "en";
    const tier = body.tier ?? (locale === "zh" ? "beta_lite" : "founder");
    const checkoutUrl = envLink(locale, tier);

    const paymentIntent = savePaymentIntent({
      locale,
      tier,
      amountLabel: amountLabel(locale, tier),
      mode: checkoutUrl ? "stripe_link" : "manual",
      status: checkoutUrl ? "checkout_ready" : "manual_required",
      email: body.email,
      intakeId: body.intakeId,
      diagnosisId: body.diagnosisId,
      checkoutUrl,
      source: body.source
    });

    saveEvent({
      name: checkoutUrl ? "checkout_started" : "manual_beta_applied",
      locale,
      properties: {
        paymentIntentId: paymentIntent.id,
        tier,
        amountLabel: paymentIntent.amountLabel,
        intakeId: body.intakeId,
        diagnosisId: body.diagnosisId,
        source: body.source
      }
    });
    await sendValidationWebhook(checkoutUrl ? "checkout_started" : "manual_beta_applied", {
      paymentIntent,
      checkoutUrl
    });

    return NextResponse.json({
      paymentIntent,
      checkoutUrl,
      manual: !checkoutUrl,
      message: checkoutUrl
        ? "Checkout link ready."
        : locale === "zh"
          ? "已记录付费体检意向。确认范围后会发送书面确认和实名收款说明；验证期暂不支持发票/对公合同。"
          : "Paid diagnosis request recorded. We will confirm scope first, then send payment instructions before delivery."
    });
  } catch {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }
}
