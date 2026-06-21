export async function sendValidationWebhook(
  type: string,
  payload: Record<string, unknown>
): Promise<void> {
  const webhookUrl = process.env.VALIDATION_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        createdAt: new Date().toISOString(),
        payload
      })
    });
  } catch {
    // Webhook capture is best-effort so validation UX never breaks on sink downtime.
  }
}
