import type {
  AnalyticsEvent,
  Diagnosis,
  IntakePayload,
  IntakeRecord,
  Lead,
  Locale,
  PaymentIntentRecord,
  StoreShape
} from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __aiPmDoctorStore: StoreShape | undefined;
}

function createStore(): StoreShape {
  return {
    intakes: new Map(),
    diagnoses: new Map(),
    leads: new Map(),
    paymentIntents: new Map(),
    events: []
  };
}

export function getStore(): StoreShape {
  if (!globalThis.__aiPmDoctorStore) {
    globalThis.__aiPmDoctorStore = createStore();
  }
  return globalThis.__aiPmDoctorStore;
}

export function makeId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function saveIntake(payload: IntakePayload): IntakeRecord {
  const store = getStore();
  const intake: IntakeRecord = {
    ...payload,
    id: makeId("intake"),
    createdAt: new Date().toISOString()
  };
  store.intakes.set(intake.id, intake);
  return intake;
}

export function saveDiagnosis(diagnosis: Diagnosis): Diagnosis {
  getStore().diagnoses.set(diagnosis.id, diagnosis);
  return diagnosis;
}

export function saveLead(input: {
  email: string;
  locale: Locale;
  idea?: string;
  intakeId?: string;
  diagnosisId?: string;
  source?: string;
  variant?: string;
}): Lead {
  const lead: Lead = {
    id: makeId("lead"),
    createdAt: new Date().toISOString(),
    ...input
  };
  getStore().leads.set(lead.id, lead);
  return lead;
}

export function savePaymentIntent(
  input: Omit<PaymentIntentRecord, "id" | "createdAt">
): PaymentIntentRecord {
  const record: PaymentIntentRecord = {
    id: makeId("pay"),
    createdAt: new Date().toISOString(),
    ...input
  };
  getStore().paymentIntents.set(record.id, record);
  return record;
}

export function saveEvent(input: {
  name: string;
  locale?: Locale;
  properties?: Record<string, unknown>;
}): AnalyticsEvent {
  const event: AnalyticsEvent = {
    id: makeId("event"),
    createdAt: new Date().toISOString(),
    ...input
  };
  getStore().events.push(event);
  return event;
}
