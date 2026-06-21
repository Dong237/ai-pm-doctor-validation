import { makeId } from "./store";
import type {
  Confidence,
  Decision,
  Diagnosis,
  EvidenceStrength,
  IntakeRecord,
  Locale,
  PrdGate,
  RiskAssessment,
  RiskLevel
} from "./types";

const t = {
  en: {
    unknownUser: "the founder's intended customer",
    weakTarget: "Target user is still too broad.",
    missingPayment: "Will this customer pay before you build more?",
    missingBehavior: "The problem sounds plausible, but behavior evidence is still thin.",
    testPayment:
      "Run a paid diagnosis / concierge offer to 20 qualified builders and require payment or deposit before deep work.",
    testNarrow:
      "Narrow to one reachable user segment, then test with 10 direct conversations and a paid slot offer.",
    iterate:
      "Use current traction to identify the conversion or activation bottleneck, then run one pricing/positioning test.",
    build:
      "Scope a small build only around the paid behavior already observed, with instrumentation from day one.",
    noPrd: "No build spec yet. Validate willingness to pay or costly behavior first.",
    prdAllowed: "Build spec allowed. Evidence is strong enough for a bounded implementation Bet.",
    summaryWeak:
      "This is a promising Bet, but it is not build-ready. The blocking risk is evidence of willingness to pay.",
    summaryNarrow:
      "The target user or problem is too broad. Narrow the Bet before testing price or scope.",
    summaryIterate:
      "You have enough signal to iterate, but the next action should target the bottleneck, not add features.",
    summaryBuild:
      "The Bet has stronger behavior evidence. Build only the smallest version that protects the validated value.",
    changePayment: "1 preorder, paid pilot, paid call, or deposit from the target user in the next 7 days.",
    changeNarrow: "A specific reachable ICP plus a repeated painful workaround from at least 5 people.",
    changeBuild: "Retention, payment, or repeated costly behavior that survives a narrow MVP test."
  },
  zh: {
    unknownUser: "目标用户",
    weakTarget: "目标用户仍然太宽。",
    missingPayment: "这个用户会不会在你继续开发前付钱？",
    missingBehavior: "问题听起来成立，但真实行为证据还不够。",
    testPayment:
      "向 20 个合格独立开发者销售一次付费产品体检，深度建议前要求付款或订金。",
    testNarrow:
      "先收窄到一个可触达用户群，再做 10 次直接访谈和付费名额测试。",
    iterate:
      "用现有数据找到转化或激活瓶颈，然后做一次定价/定位测试。",
    build:
      "只围绕已经被付费行为验证的价值做最小版本，并从第一天埋点。",
    noPrd: "暂不生成构建规格。先验证付费意愿或高成本行为。",
    prdAllowed: "可以生成构建规格。证据足够支持一个边界清晰的 Bet。",
    summaryWeak:
      "这个 Bet 有潜力，但还没有达到可构建状态。最大风险是付费意愿证据不足。",
    summaryNarrow:
      "目标用户或问题太宽。先收窄 Bet，再测试价格或范围。",
    summaryIterate:
      "已有一定信号，下一步应该解决瓶颈，而不是继续加功能。",
    summaryBuild:
      "Bet 已经有更强的行为证据。只构建能保护已验证价值的最小版本。",
    changePayment: "未来 7 天内拿到目标用户的 1 个预订、付费试点、付费电话或订金。",
    changeNarrow: "明确一个可触达 ICP，并从至少 5 个人那里看到重复的痛苦 workaround。",
    changeBuild: "在小 MVP 测试中出现留存、付费或重复高成本行为。"
  }
} satisfies Record<Locale, Record<string, string>>;

function text(value?: string): string {
  return (value ?? "").trim();
}

function sentence(value: string): string {
  return value.replace(/[。.!?！？]+$/g, "").trim();
}

function includesAny(value: string, needles: string[]): boolean {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function hasEvidence(intake: IntakeRecord, needles: string[]): boolean {
  const joined = [
    ...(intake.known_evidence_type ?? []),
    intake.current_traction,
    intake.evidence_links,
    intake.current_workaround,
    intake.business_goal,
    intake.biggest_uncertainty
  ]
    .filter(Boolean)
    .join(" ");
  return includesAny(joined, needles);
}

function hasPositivePaymentEvidence(intake: IntakeRecord): boolean {
  const explicitEvidence = (intake.known_evidence_type ?? []).join(" ");
  if (includesAny(explicitEvidence, ["payment/deposit", "retention", "paid pilot", "preorder"])) {
    return true;
  }

  const joined = [intake.current_traction, intake.current_workaround, intake.evidence_links]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const negativePayment = includesAny(joined, [
    "no payment",
    "no paying",
    "no paid",
    "no revenue",
    "0 paid",
    "0 payment",
    "without payment",
    "not paid",
    "not paying",
    "未付费",
    "没有付费",
    "无付费",
    "无收入",
    "没有收入",
    "没有付款",
    "未付款",
    "0 个付费",
    "0付费"
  ]);

  if (negativePayment) {
    return false;
  }

  return includesAny(joined, [
    "paid",
    "payment",
    "paying",
    "preorder",
    "deposit",
    "revenue",
    "mrr",
    "stripe",
    "订金",
    "付款",
    "付费",
    "收入",
    "预售",
    "定金"
  ]);
}

function hasMeaningfulTraction(intake: IntakeRecord): boolean {
  const traction = text(intake.current_traction).toLowerCase();
  if (!traction) {
    return false;
  }

  const quantifiedSignal =
    /\b\d+[\w.%]*\s*(users?|visitors?|visits?|signups?|waitlist|replies|calls?|demos?|trials?|conversions?|customers?|mrr|revenue)\b/.test(
      traction
    ) ||
    /\b(users?|visitors?|visits?|signups?|waitlist|replies|calls?|demos?|trials?|conversions?|customers?|mrr|revenue)\s*[:=]\s*\d+/.test(
      traction
    ) ||
    /\d+\s*(个)?(用户|访问|注册|回复|咨询|演示|试用|转化|客户|付费|收入)/.test(traction);

  const negativeOnly = includesAny(traction, [
    "only a landing page",
    "landing page only",
    "screenshots only",
    "prototype only",
    "no users",
    "0 users",
    "zero users",
    "no traffic",
    "0 traffic",
    "no visits",
    "no replies",
    "no signups",
    "none yet",
    "nothing yet",
    "还没有用户",
    "没有用户",
    "无用户",
    "没有流量",
    "没有访问",
    "没有注册",
    "只有落地页",
    "只有原型"
  ]);

  if (negativeOnly && !quantifiedSignal) {
    return false;
  }

  return (
    quantifiedSignal ||
    includesAny(traction, [
      "active users",
      "early users",
      "signups",
      "waitlist",
      "visitors",
      "traffic",
      "replies",
      "calls",
      "demos",
      "trials",
      "conversions",
      "customers",
      "用户",
      "访问",
      "注册",
      "回复",
      "咨询",
      "演示",
      "试用",
      "转化",
      "客户"
    ])
  );
}

function level(label: string, note: string, riskLevel: RiskLevel): RiskAssessment {
  return { label, note, level: riskLevel };
}

export function createDiagnosis(intake: IntakeRecord): Diagnosis {
  const locale = intake.locale;
  const copy = t[locale];
  const target = text(intake.target_user) || copy.unknownUser;
  const problem = text(intake.problem) || text(intake.idea);
  const solution = text(intake.solution_guess) || (locale === "zh" ? "产品诊断" : "product diagnosis");
  const hasSpecificTarget = target.length >= 18 && !includesAny(target, ["everyone", "all users", "所有人", "用户"]);
  const hasProblem = problem.length >= 24;
  const hasWorkaround = text(intake.current_workaround).length >= 12;
  const hasUrl = text(intake.product_url).length > 0;
  const hasTraction = hasMeaningfulTraction(intake);
  const hasPayment = hasPositivePaymentEvidence(intake);
  const hasComplaint = hasEvidence(intake, [
    "complaint",
    "reddit",
    "xhs",
    "review",
    "support",
    "search",
    "小红书",
    "评论",
    "差评",
    "反馈",
    "搜索"
  ]);

  let evidence_strength: EvidenceStrength = "weak";
  if ((hasComplaint || hasWorkaround || hasTraction) && hasSpecificTarget && hasProblem) {
    evidence_strength = "medium";
  }
  if (hasPayment && hasSpecificTarget && hasProblem) {
    evidence_strength = "strong";
  }

  let decision: Decision = "test";
  let confidence: Confidence = "low";
  let prd_gate: PrdGate = "blocked";
  let summary = copy.summaryWeak;
  let next_action = copy.testPayment;
  let riskiest_assumption = copy.missingPayment;
  let what_would_change = copy.changePayment;

  if (!hasSpecificTarget || !hasProblem) {
    decision = "narrow";
    summary = copy.summaryNarrow;
    next_action = copy.testNarrow;
    riskiest_assumption = copy.weakTarget;
    what_would_change = copy.changeNarrow;
  } else if (hasPayment) {
    decision = hasTraction || hasUrl ? "build" : "test";
    confidence = hasTraction ? "high" : "medium";
    prd_gate = hasTraction || hasUrl ? "allowed" : "blocked";
    summary = prd_gate === "allowed" ? copy.summaryBuild : copy.summaryWeak;
    next_action = prd_gate === "allowed" ? copy.build : copy.testPayment;
    riskiest_assumption = prd_gate === "allowed" ? copy.missingBehavior : copy.missingPayment;
    what_would_change = prd_gate === "allowed" ? copy.changeBuild : copy.changePayment;
  } else if (hasTraction || intake.product_stage === "early_users" || intake.product_stage === "launched_no_users") {
    decision = "iterate";
    confidence = "medium";
    summary = copy.summaryIterate;
    next_action = copy.iterate;
    riskiest_assumption = copy.missingPayment;
    what_would_change = copy.changePayment;
  } else if (evidence_strength === "medium") {
    decision = "test";
    confidence = "medium";
  }

  const valueRisk = hasPayment
    ? level("Value", locale === "en" ? "Payment or revenue signal exists." : "已有付费或收入信号。", "low")
    : level("Value", locale === "en" ? "Payment intent is not proven." : "付费意愿尚未证明。", "high");

  const usabilityRisk = hasUrl
    ? level("Usability", locale === "en" ? "A real surface can be reviewed." : "已有真实产品界面可检查。", "medium")
    : level("Usability", locale === "en" ? "No concrete product surface yet." : "还没有可检查的真实产品界面。", "medium");

  const feasibilityRisk = includesAny(`${intake.coding_skill} ${intake.time_per_week}`, ["limited", "none", "低", "不会", "少"])
    ? level("Feasibility", locale === "en" ? "Founder constraints may force a manual test first." : "创始人约束意味着应先做人工测试。", "medium")
    : level("Feasibility", locale === "en" ? "Feasible if scope stays narrow." : "只要范围收窄，具备可行性。", "low");

  const viabilityRisk = hasPayment
    ? level("Viability", locale === "en" ? "Some business signal exists." : "已有一定商业信号。", "medium")
    : level(
        "Viability",
        locale === "en" ? "Business model still depends on willingness-to-pay proof." : "商业可行性仍依赖付费证明。",
        "high"
      );

  const bet =
    locale === "en"
      ? `Target: ${sentence(target)}. Problem: ${sentence(problem)}. Proposed solution: ${sentence(solution)}. Current blocker: prove they will pay before more build time.`
      : `目标用户：${sentence(target)}。问题：${sentence(problem)}。方案：${sentence(solution)}。当前阻塞点：先证明他们愿意在继续开发前付费。`;

  return {
    id: makeId("diag"),
    intakeId: intake.id,
    locale,
    createdAt: new Date().toISOString(),
    bet_statement: bet,
    target_user: target,
    evidence_strength,
    four_risks: {
      value: valueRisk,
      usability: usabilityRisk,
      feasibility: feasibilityRisk,
      viability: viabilityRisk
    },
    riskiest_assumption,
    decision,
    confidence,
    next_action,
    prd_gate,
    summary,
    what_would_change
  };
}
