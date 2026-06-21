export type Locale = "en" | "zh";

export type ProductStage =
  | "idea"
  | "prototype"
  | "launched_no_users"
  | "early_users"
  | "revenue"
  | "not_sure";

export type EvidenceStrength = "weak" | "medium" | "strong";
export type Decision = "build" | "test" | "kill" | "narrow" | "wait" | "iterate";
export type Confidence = "low" | "medium" | "high";
export type PrdGate = "allowed" | "blocked";
export type RiskLevel = "low" | "medium" | "high";

export interface IntakePayload {
  locale: Locale;
  idea: string;
  product_stage: ProductStage;
  product_url?: string;
  target_user?: string;
  problem?: string;
  solution_guess?: string;
  current_workaround?: string;
  competitors?: string;
  known_evidence_type?: string[];
  evidence_links?: string;
  current_traction?: string;
  business_goal?: string;
  biggest_uncertainty?: string;
  time_per_week?: string;
  budget?: string;
  coding_skill?: string;
  design_skill?: string;
  sales_comfort?: string;
  audience_or_channel?: string;
  language_preference?: Locale;
  source?: string;
  variant?: string;
}

export interface IntakeRecord extends IntakePayload {
  id: string;
  createdAt: string;
}

export interface RiskAssessment {
  level: RiskLevel;
  label: string;
  note: string;
}

export interface Diagnosis {
  id: string;
  intakeId: string;
  locale: Locale;
  createdAt: string;
  bet_statement: string;
  target_user: string;
  evidence_strength: EvidenceStrength;
  four_risks: {
    value: RiskAssessment;
    usability: RiskAssessment;
    feasibility: RiskAssessment;
    viability: RiskAssessment;
  };
  riskiest_assumption: string;
  decision: Decision;
  confidence: Confidence;
  next_action: string;
  prd_gate: PrdGate;
  summary: string;
  what_would_change: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  email: string;
  locale: Locale;
  idea?: string;
  intakeId?: string;
  diagnosisId?: string;
  source?: string;
  variant?: string;
}

export interface PaymentIntentRecord {
  id: string;
  createdAt: string;
  locale: Locale;
  tier: string;
  amountLabel: string;
  mode: "stripe_link" | "manual";
  status: "checkout_ready" | "manual_required" | "disabled";
  email?: string;
  intakeId?: string;
  diagnosisId?: string;
  checkoutUrl?: string;
  source?: string;
}

export interface AnalyticsEvent {
  id: string;
  createdAt: string;
  name: string;
  locale?: Locale;
  properties?: Record<string, unknown>;
}

export interface StoreShape {
  intakes: Map<string, IntakeRecord>;
  diagnoses: Map<string, Diagnosis>;
  leads: Map<string, Lead>;
  paymentIntents: Map<string, PaymentIntentRecord>;
  events: AnalyticsEvent[];
}
