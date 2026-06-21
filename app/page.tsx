"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Diagnosis, IntakePayload, Locale, ProductStage } from "@/src/lib/types";

type PageCopy = {
  nav: {
    how: string;
    pricing: string;
    sample: string;
    cases: string;
    faq: string;
    login: string;
    cta: string;
  };
  hero: {
    badge: string;
    h1A: string;
    h1Bet: string;
    h1B: string;
    subcopy: string;
    inputPlaceholder: string;
    primary: string;
    social: string;
    noteA: string;
    noteB: string;
    trust: Array<{ title: string; detail: string }>;
  };
  console: {
    title: string;
    unsaved: string;
    confidence: string;
    evidence: string;
    prdGate: string;
    intake: string;
    reasoning: string;
    diagnosis: string;
    framing: string;
    betStatement: string;
    risks: string;
    riskiest: string;
    evidenceCheck: string;
    stillNeed: string;
    decision: string;
    why: string;
    nextBest: string;
    change: string;
    blockedNote: string;
    editIntake: string;
    stage: string;
    product: string;
    target: string;
    problem: string;
    solution: string;
    traction: string;
    uncertainty: string;
    paymentIntent: string;
    paymentTest: string;
    interview: string;
    competitorGap: string;
  };
  ledger: {
    eyebrow: string;
    title: string;
    copy: string;
    seeAll: string;
  };
  form: {
    title: string;
    copy: string;
    idea: string;
    ideaPlaceholder: string;
    url: string;
    urlPlaceholder: string;
    stage: string;
    target: string;
    targetPlaceholder: string;
    problem: string;
    problemPlaceholder: string;
    solution: string;
    solutionPlaceholder: string;
    evidence: string;
    evidencePlaceholder: string;
    traction: string;
    tractionPlaceholder: string;
    uncertainty: string;
    uncertaintyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    generate: string;
    save: string;
    report: string;
    paid: string;
    required: string;
    saved: string;
  };
  sample: {
    eyebrow: string;
    title: string;
    copy: string;
    rows: Array<[string, string]>;
    noPrd: string;
    receives: string[];
  };
  method: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: Array<[string, string]>;
  };
  proof: {
    eyebrow: string;
    title: string;
    copy: string;
    cards: Array<[string, string]>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    copy: string;
    cards: Array<{
      tier: string;
      title: string;
      price: string;
      description: string;
      items: string[];
      cta: string;
      featured?: boolean;
    }>;
    note: string;
    afterApply: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<[string, string]>;
  };
  footer: string;
};

const stageLabels: Record<ProductStage, Record<Locale, string>> = {
  idea: { en: "Idea", zh: "想法" },
  prototype: { en: "Prototype", zh: "原型" },
  launched_no_users: { en: "Launched, no users", zh: "已上线但没人用" },
  early_users: { en: "Early users", zh: "已有早期用户" },
  revenue: { en: "Revenue", zh: "已有收入" },
  not_sure: { en: "Not sure", zh: "不确定" }
};

const stages = Object.keys(stageLabels) as ProductStage[];

const copy: Record<Locale, PageCopy> = {
  en: {
    nav: {
      how: "How it works",
      pricing: "Pricing",
      sample: "Sample Diagnosis",
      cases: "Case Studies",
      faq: "FAQ",
      login: "Log in",
      cta: "Get Diagnosis - $99"
    },
    hero: {
      badge: "AI PM DOCTOR FOR INDIE BUILDERS",
      h1A: "Before you build, know if the",
      h1Bet: "Bet",
      h1B: "deserves build time.",
      subcopy:
        "IndiePM Clinic diagnoses your idea or product with evidence, finds the riskiest assumption, and tells you to Build, Test, Kill, Narrow, Wait, or Iterate.",
      inputPlaceholder: "Paste your product, landing page, or idea...",
      primary: "Diagnose my Bet",
      social: "Trusted by indie builders worldwide",
      noteA: "Not a PRD generator. Not growth hacking.",
      noteB: "We help you make the right product decisions.",
      trust: [
        { title: "24h", detail: "Human-reviewed PM diagnosis" },
        { title: "No Charge", detail: "If we don't accept your case" },
        { title: "Refund", detail: "If not delivered as promised" },
        { title: "Source Ledger", detail: "Every claim links to evidence" }
      ]
    },
    console: {
      title: "New Diagnosis",
      unsaved: "Unsaved",
      confidence: "Confidence",
      evidence: "Evidence",
      prdGate: "PRD Gate",
      intake: "Intake",
      reasoning: "Reasoning",
      diagnosis: "Diagnosis",
      framing: "Framing the Bet",
      betStatement: "Bet Statement",
      risks: "Four Risks (SVPG)",
      riskiest: "Riskiest Assumption",
      evidenceCheck: "Evidence Check",
      stillNeed: "What we still need",
      decision: "Decision",
      why: "Why",
      nextBest: "Next Best Action",
      change: "What would change this",
      blockedNote: "We don't write specs until the Bet is build-ready.",
      editIntake: "Edit intake",
      stage: "Stage",
      product: "Product",
      target: "Target user",
      problem: "Core problem",
      solution: "Solution guess",
      traction: "Current traction",
      uncertainty: "Top uncertainty",
      paymentIntent: "Payment intent is unproven",
      paymentTest: "Payment intent (Deposit / Preorder)",
      interview: "Interview (Past behavior)",
      competitorGap: "Competitor gap (Depth)"
    },
    ledger: {
      eyebrow: "Evidence Ledger (Preview)",
      title: "We don't guess. We show our work.",
      copy: "Every claim links to real signals. You see sources, strength, and recency.",
      seeAll: "See all evidence"
    },
    form: {
      title: "Case intake",
      copy:
        "Use the quick input above for a preview, or fill the case context so the diagnosis can judge the real Bet.",
      idea: "What should we diagnose?",
      ideaPlaceholder:
        "Example: I have an AI SaaS landing page with traffic but no paid users. I do not know if the issue is ICP, pricing, or product value.",
      url: "Product URL",
      urlPlaceholder: "https://your-product.com",
      stage: "Stage",
      target: "Target user",
      targetPlaceholder: "e.g. solo AI SaaS builders with a live prototype",
      problem: "Problem / job",
      problemPlaceholder: "What painful situation should this solve?",
      solution: "Solution guess",
      solutionPlaceholder: "What are you thinking of building or changing?",
      evidence: "Known evidence",
      evidencePlaceholder: "Complaints, reviews, search, calls, traffic, signups, payment attempts...",
      traction: "Current traction",
      tractionPlaceholder: "e.g. 900 visitors / 33 signups / 0 paid users",
      uncertainty: "Biggest uncertainty",
      uncertaintyPlaceholder: "e.g. Will founders pay for AI notes?",
      email: "Email to save preview",
      emailPlaceholder: "you@example.com",
      generate: "Generate diagnosis preview",
      save: "Save preview",
      report: "Open report",
      paid: "Get $99 diagnosis",
      required: "Enter at least the product situation or URL.",
      saved: "Saved. Next step: choose a paid diagnosis slot or manual beta application."
    },
    sample: {
      eyebrow: "Sample output",
      title: "A decision record, not a generic report",
      copy: "A real diagnosis is a compact PM memo: Bet, evidence, risks, confidence, and the next validation action.",
      rows: [
        ["Situation", "Traffic exists, but no paid users. The founder is unsure whether to rewrite positioning or build features."],
        ["Bet", "Solo AI SaaS builders will pay for sharper product judgment before spending another sprint."],
        ["Evidence", "Complaints and search demand are real. Payment evidence is missing."],
        ["Decision", "TEST, not build. PRD is blocked until willingness to pay is validated."],
        ["Next test", "Sell 5 paid diagnosis slots to qualified builders with live prototypes."]
      ],
      noPrd: "No PRD yet. Payment evidence is missing.",
      receives: [
        "PM diagnosis memo",
        "Bet statement",
        "evidence gap",
        "riskiest assumption",
        "pricing / ICP / positioning notes",
        "next 7-day validation test",
        "coding-agent prompt only if build-ready"
      ]
    },
    method: {
      eyebrow: "Protocol",
      title: "The PM loop behind the judgment",
      copy: "The UI stays simple; the backend reasoning follows the product protocol in this repo.",
      steps: [
        ["Orient", "Understand stage, goal, constraints, founder ability, and current uncertainty."],
        ["Frame Bet", "Convert the messy idea into target user, situation, job, solution guess, and outcome."],
        ["Inspect Evidence", "Check complaints, reviews, search, competitors, metrics, and payment signals."],
        ["Map Risk", "Identify value, usability, feasibility, and viability risks."],
        ["Decide", "Choose build, test, kill, narrow, wait, or iterate with confidence and next action."]
      ]
    },
    proof: {
      eyebrow: "Why not just ChatGPT?",
      title: "The value is not another answer. It is a checkable decision record.",
      copy:
        "Generic AI can brainstorm. This service forces the PM loop: frame the Bet, attach evidence, expose contradictions, block PRD when WTP is missing, and produce the next paid test.",
      cards: [
        ["Evidence first", "Claims must connect to a source, metric, complaint, interview fact, payment attempt, or explicit user-provided input."],
        ["Contradiction visible", "Supporting and weakening signals are shown together so the diagnosis cannot hide inconvenient facts."],
        ["Decision gate", "Weak WTP blocks PRD/spec output. The deliverable becomes a concrete validation test instead."],
        ["Human review", "AI drafts the structure; David checks the judgment, scope, confidence, and next action before delivery."]
      ]
    },
    pricing: {
      eyebrow: "Paid diagnosis",
      title: "One-time diagnosis. No subscription trap.",
      copy: "Start with a written decision. Upgrade only when you need deeper teardown and review.",
      cards: [
        {
          tier: "founder",
          title: "Founder Diagnosis",
          price: "$99",
          description: "24h report for one product and one current decision.",
          items: ["Bet + evidence review", "risk map", "7-day validation plan"],
          cta: "Get diagnosis - $99",
          featured: true
        },
        {
          tier: "deep",
          title: "Deep Teardown",
          price: "$249",
          description: "Report plus rewritten positioning and a 20-min review call.",
          items: ["landing page critique", "pricing / ICP notes", "call + written summary"],
          cta: "Book deep teardown"
        }
      ],
      note:
        "Payment happens only after scope fit is confirmed. Use secure checkout where available; otherwise you receive manual payment instructions before delivery.",
      afterApply: [
        "You receive an email confirmation and intake summary.",
        "If the case is accepted, payment instructions are sent before delivery.",
        "Written report is delivered within 24h.",
        "No charge if the case is not accepted; refund if the report is not delivered."
      ]
    },
    faq: {
      eyebrow: "FAQ",
      title: "Trust and limits",
      items: [
        ["Is this a PRD generator?", "No. A PRD is allowed only when evidence is strong enough. Weak evidence produces a test plan."],
        ["What if I have no evidence?", "Then the diagnosis creates the strongest feasible evidence test before build work."],
        ["Do you guarantee growth?", "No. We diagnose, prioritize, and design tests. We do not guarantee revenue or PMF."],
        ["Do you need private access?", "No admin, API, repo, database, or payment credentials are needed for V1. Submit only redacted context."],
        ["Can it write a Cursor/Codex prompt?", "Only if the Bet is build-ready."]
      ]
    },
    footer: "Evidence before PRD. Test before build when WTP is missing."
  },
  zh: {
    nav: {
      how: "如何工作",
      pricing: "价格",
      sample: "诊断样例",
      cases: "案例",
      faq: "FAQ",
      login: "登录",
      cta: "申请 ¥499 体检"
    },
    hero: {
      badge: "给独立开发者的 AI PM Doctor",
      h1A: "先判断这个",
      h1Bet: "Bet",
      h1B: "值不值得继续写代码。",
      subcopy:
        "IndiePM Clinic 会用证据诊断你的想法或产品，找到最大风险，并告诉你应该 Build、Test、Kill、Narrow、Wait 还是 Iterate。",
      inputPlaceholder: "粘贴你的产品、落地页或想法...",
      primary: "诊断我的 Bet",
      social: "被独立开发者用于产品判断",
      noteA: "不是 PRD 生成器。不是增长玄学。",
      noteB: "我们帮你做正确的产品决策。",
      trust: [
        { title: "48h", detail: "人工复核产品体检" },
        { title: "不接不收", detail: "不适合的 case 不收费" },
        { title: "可退", detail: "未按约定交付可退回" },
        { title: "证据账本", detail: "关键判断都链接证据" }
      ]
    },
    console: {
      title: "新诊断",
      unsaved: "未保存",
      confidence: "信心",
      evidence: "证据",
      prdGate: "PRD Gate",
      intake: "输入",
      reasoning: "推理",
      diagnosis: "诊断",
      framing: "梳理 Bet",
      betStatement: "Bet Statement",
      risks: "四类风险 (SVPG)",
      riskiest: "最大假设",
      evidenceCheck: "证据检查",
      stillNeed: "仍然需要什么",
      decision: "判断",
      why: "原因",
      nextBest: "下一步动作",
      change: "什么会改变判断",
      blockedNote: "Bet 未达到可构建状态前，不写规格。",
      editIntake: "编辑输入",
      stage: "阶段",
      product: "产品",
      target: "目标用户",
      problem: "核心问题",
      solution: "方案猜测",
      traction: "当前数据",
      uncertainty: "最大不确定性",
      paymentIntent: "付费意愿未验证",
      paymentTest: "付费意愿（订金 / 预售）",
      interview: "访谈（过去行为）",
      competitorGap: "竞品缺口（深度）"
    },
    ledger: {
      eyebrow: "证据账本（预览）",
      title: "我们不猜。我们展示证据。",
      copy: "每个判断都连接真实信号。你会看到来源、强度和时效。",
      seeAll: "查看全部证据"
    },
    form: {
      title: "Case 输入",
      copy: "上方可以快速预览；这里可以补充上下文，让诊断真正判断你的 Bet。",
      idea: "你希望诊断什么？",
      ideaPlaceholder:
        "例如：我的 AI 工具落地页有访问但没人付费，不知道问题是 ICP、定价、定位还是产品价值。",
      url: "产品链接",
      urlPlaceholder: "https://your-product.com",
      stage: "阶段",
      target: "目标用户",
      targetPlaceholder: "例如：已有原型但没有转化的独立开发者",
      problem: "问题 / job",
      problemPlaceholder: "这个产品到底解决什么痛苦场景？",
      solution: "方案猜测",
      solutionPlaceholder: "你准备构建或修改什么？",
      evidence: "已有证据",
      evidencePlaceholder: "评论、差评、搜索、访谈、流量、注册、付款尝试...",
      traction: "当前数据",
      tractionPlaceholder: "例如：900 访问 / 33 注册 / 0 付费用户",
      uncertainty: "最大不确定性",
      uncertaintyPlaceholder: "例如：用户是否愿意为 AI notes 付费？",
      email: "保存预览的邮箱",
      emailPlaceholder: "you@example.com",
      generate: "生成诊断预览",
      save: "保存预览",
      report: "打开报告",
      paid: "申请 ¥499 Beta",
      required: "请至少填写产品情况或链接。",
      saved: "已保存。下一步可以申请付费体检名额。"
    },
    sample: {
      eyebrow: "样例输出",
      title: "这是一份决策记录，不是通用报告",
      copy: "真实诊断是一份紧凑 PM memo：Bet、证据、风险、信心和下一步验证动作。",
      rows: [
        ["情况", "落地页有访问但没有付费用户，创始人不确定要改定位还是继续加功能。"],
        ["Bet", "已有 AI SaaS 原型的独立开发者，会为更清晰的产品判断付费。"],
        ["证据", "抱怨和搜索需求存在，但直接付费证据缺失。"],
        ["判断", "TEST，不构建。付费意愿验证前不生成 PRD。"],
        ["下一步测试", "向有线上原型的开发者销售 5 个付费体检名额。"]
      ],
      noPrd: "暂不生成 PRD。付费证据缺失。",
      receives: [
        "PM 诊断 memo",
        "Bet statement",
        "证据缺口",
        "最大风险",
        "定价 / ICP / 定位建议",
        "下一步 7 天验证测试",
        "只有达到可构建状态才给 coding-agent prompt"
      ]
    },
    method: {
      eyebrow: "Protocol",
      title: "判断背后的 PM loop",
      copy: "前台保持简单，后台运行 repo 里的 PM reasoning protocol。",
      steps: [
        ["Orient", "理解阶段、目标、约束、创始人能力和当前不确定性。"],
        ["Frame Bet", "把混乱想法变成目标用户、场景、job、方案和结果。"],
        ["Inspect Evidence", "检查投诉、评论、搜索、竞品、数据和付款信号。"],
        ["Map Risk", "识别 value、usability、feasibility、viability 风险。"],
        ["Decide", "基于信心给出 build、test、kill、narrow、wait 或 iterate。"]
      ]
    },
    proof: {
      eyebrow: "为什么不直接问 ChatGPT？",
      title: "价值不是再给一个答案，而是生成可检查的产品决策记录。",
      copy:
        "通用 AI 很适合发散想法，但很容易接受假设、跳过证据、直接写 PRD。这个服务强制走 PM loop：梳理 Bet、绑定证据、暴露反证、缺少付费证据时阻断 PRD，并给出下一步付费测试。",
      cards: [
        ["证据优先", "每个关键判断都要连接到来源、数据、抱怨、访谈事实、付款尝试或用户明确提供的事实。"],
        ["反证可见", "支持和削弱 Bet 的信号一起展示，避免只挑对自己有利的信息。"],
        ["决策 gate", "付费意愿弱时不写 PRD/功能列表，而是输出可执行的验证测试。"],
        ["人工复核", "AI 负责结构化初稿；David 复核判断、范围、信心和下一步动作。"]
      ]
    },
    pricing: {
      eyebrow: "付费体检",
      title: "一次性诊断，不做订阅陷阱。",
      copy: "先从书面判断开始；需要更深拆解和会议时再升级。",
      cards: [
        {
          tier: "async",
          title: "异步产品体检",
          price: "¥199",
          description: "48 小时内交付，适合已有 demo 或 landing page 的产品。",
          items: ["书面诊断", "3 个阻塞点", "7 天验证计划"],
          cta: "申请异步体检",
          featured: true
        },
        {
          tier: "beta_lite",
          title: "Beta 产品体检",
          price: "¥499",
          description: "45 分钟腾讯会议 + short report，适合已有用户或流量的产品。",
          items: ["Bet 判断", "证据缺口", "会议 + short report"],
          cta: "申请 Beta 名额"
        }
      ],
      note:
        "验证期暂不支持发票 / 对公合同。付款前先发送书面确认：收款方实名信息、服务范围、交付时间、退款条件。支持微信 / 支付宝实名收款；未确认范围不付款，未交付可原路退回。",
      afterApply: [
        "提交申请后先人工确认范围和排期。",
        "确认接单后发送书面确认和实名收款说明。",
        "48 小时内交付 short report。",
        "未确认、未交付或无法接单时可退回。"
      ]
    },
    faq: {
      eyebrow: "FAQ",
      title: "信任和边界",
      items: [
        ["这是 PRD 生成器吗？", "不是。只有证据足够强时才允许生成 PRD；证据弱时生成验证测试。"],
        ["如果我没有证据怎么办？", "那诊断会先帮你设计最强可行的证据测试，而不是继续写功能。"],
        ["保证增长吗？", "不保证。我们提供诊断、优先级和测试设计，不承诺收入或 PMF。"],
        ["需要私密权限吗？", "V1 不需要后台、API、repo、数据库或支付后台权限。"],
        ["能写 Cursor/Codex prompt 吗？", "只有 Bet 达到可构建状态才会写。"],
        ["中文付款怎么处理？", "先申请名额，确认范围后再付款。付款前提供实名收款信息、服务范围、交付时间和退款条件。"]
      ]
    },
    footer: "证据先于 PRD。付费意愿未验证时，先测试再构建。"
  }
};

const ledgerRows: Record<
  Locale,
  Array<{ type: string; strength: "high" | "medium" | "low"; quote: string; source: string; age: string }>
> = {
  en: [
    {
      type: "Forum Complaint",
      strength: "high",
      quote: '"I have hundreds of notes but can never find what I need when I actually need it."',
      source: "Reddit r/SaaS",
      age: "2 days ago"
    },
    {
      type: "Search Demand",
      strength: "medium",
      quote: '"Best ai notes for founders" search volume up 120% in 6 months.',
      source: "Google Trends",
      age: "1 week ago"
    },
    {
      type: "Competitor Review",
      strength: "high",
      quote: '"Great capture, but insights and connections are still manual and limited."',
      source: "G2 - Competitor",
      age: "5 days ago"
    },
    {
      type: "Pricing Page",
      strength: "low",
      quote: "No pricing page on competitors or weak monetization signals.",
      source: "Competitor Scan",
      age: "3 days ago"
    }
  ],
  zh: [
    {
      type: "社区抱怨",
      strength: "high",
      quote: "“收藏了很多资料，但真正要用的时候根本找不到。”",
      source: "即刻 / V2EX",
      age: "2 天前"
    },
    {
      type: "搜索需求",
      strength: "medium",
      quote: "“AI 笔记 / 创始人知识库”相关搜索在近 6 个月明显上升。",
      source: "搜索趋势",
      age: "1 周前"
    },
    {
      type: "竞品评论",
      strength: "high",
      quote: "“记录很好，但洞察和连接仍然很手动。”",
      source: "竞品评论",
      age: "5 天前"
    },
    {
      type: "价格页",
      strength: "low",
      quote: "竞品定价页不清晰，商业化信号偏弱。",
      source: "竞品扫描",
      age: "3 天前"
    }
  ]
};

type PreviewDiagnosis = ReturnType<typeof sampleDiagnosis> | Diagnosis;

function initialForm(locale: Locale): IntakePayload {
  return {
    locale,
    idea: "",
    product_stage: "prototype",
    product_url: "",
    target_user: "",
    problem: "",
    solution_guess: "",
    current_workaround: "",
    competitors: "",
    known_evidence_type: [],
    evidence_links: "",
    current_traction: "",
    business_goal: "",
    biggest_uncertainty: "",
    time_per_week: "",
    budget: "",
    coding_skill: "",
    design_skill: "",
    sales_comfort: "",
    audience_or_channel: "",
    language_preference: locale,
    source: "",
    variant: "balanced_commercial_workbench_v1"
  };
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return (await response.json()) as T;
}

function sampleDiagnosis(locale: Locale): Pick<
  Diagnosis,
  | "bet_statement"
  | "target_user"
  | "evidence_strength"
  | "riskiest_assumption"
  | "decision"
  | "confidence"
  | "next_action"
  | "prd_gate"
  | "summary"
  | "what_would_change"
> {
  return locale === "zh"
    ? {
        bet_statement:
          "已有 AI 工具原型的独立开发者，会为更清晰的产品判断付费，而不是继续盲目写功能。",
        target_user: "已有 demo / landing page 但没有稳定付费的独立开发者",
        evidence_strength: "medium",
        riskiest_assumption: "他们是否愿意在继续开发前为产品体检付费？",
        decision: "test",
        confidence: "medium",
        next_action: "创建价值主张 + 价格页，向 20 个合格开发者销售 5 个付费体检名额。",
        prd_gate: "blocked",
        summary: "有真实痛感和方向性证据，但付费意愿未验证。下一步是付费测试，不是 PRD。",
        what_would_change: "7 天内拿到 3 个付款或订金。"
      }
    : {
        bet_statement:
          "Indie builders with live AI prototypes will pay for sharper PM judgment before spending another sprint.",
        target_user: "solo AI SaaS builders with a demo, landing page, or early users but weak conversion",
        evidence_strength: "medium",
        riskiest_assumption: "Will they pay for PM diagnosis instead of asking ChatGPT or friends?",
        decision: "test",
        confidence: "medium",
        next_action: "Create a value prop + pricing page, then sell 5 paid diagnosis slots to qualified builders.",
        prd_gate: "blocked",
        summary: "Pain and directional evidence exist, but willingness to pay is unproven. Test before PRD.",
        what_would_change: "3 paid orders or deposits within 7 days."
      };
}

function statusClass(value: string) {
  if (["strong", "high", "allowed", "build"].includes(value.toLowerCase())) return "good";
  if (["weak", "low", "blocked", "kill"].includes(value.toLowerCase())) return "bad";
  return "warn";
}

function riskClass(level: string) {
  if (level.toLowerCase() === "low") return "good";
  if (level.toLowerCase() === "high") return "bad";
  return "warn";
}

function statusLabel(value: string, locale: Locale) {
  if (locale === "en") return value;
  const labels: Record<string, string> = {
    low: "低",
    weak: "弱",
    medium: "中",
    high: "高",
    strong: "强",
    blocked: "已阻断",
    allowed: "可生成",
    test: "测试",
    build: "构建",
    narrow: "收窄",
    wait: "暂缓",
    iterate: "迭代",
    kill: "停止"
  };
  return labels[value.toLowerCase()] ?? value;
}

function decisionLabel(decision: string, locale: Locale) {
  const key = decision.toLowerCase();
  if (locale === "zh") {
    if (key === "test") return "TEST，暂不构建";
    if (key === "build") return "BUILD，但收窄范围";
    if (key === "narrow") return "NARROW，先收窄";
    if (key === "iterate") return "ITERATE，先找瓶颈";
    if (key === "kill") return "KILL，停止投入";
    return "WAIT，暂缓";
  }
  if (key === "test") return "TEST, NOT BUILD";
  if (key === "build") return "BUILD, BOUNDED";
  if (key === "narrow") return "NARROW THE BET";
  if (key === "iterate") return "ITERATE ON BOTTLENECK";
  if (key === "kill") return "KILL THE BET";
  return "WAIT";
}

function riskCards(preview: PreviewDiagnosis, locale: Locale) {
  if ("four_risks" in preview) {
    return [
      preview.four_risks.value,
      preview.four_risks.usability,
      preview.four_risks.feasibility,
      preview.four_risks.viability
    ];
  }

  return locale === "zh"
    ? [
        { label: "Value", level: "high", note: "付费意愿未证明。" },
        { label: "Usability", level: "medium", note: "需要检查真实产品表面。" },
        { label: "Feasibility", level: "low", note: "可先用人工测试验证。" },
        { label: "Viability", level: "high", note: "商业信号仍不足。" }
      ]
    : [
        { label: "Value", level: "high", note: "Payment intent is not proven." },
        { label: "Usability", level: "medium", note: "A real product surface should be reviewed." },
        { label: "Feasibility", level: "low", note: "A manual test can validate first." },
        { label: "Viability", level: "high", note: "Business signal is still thin." }
      ];
}

function short(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [form, setForm] = useState<IntakePayload>(() => initialForm("en"));
  const [email, setEmail] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [reportUrl, setReportUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);
  const c = copy[locale];
  const preview = diagnosis ?? sampleDiagnosis(locale);

  const source = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("utm_source") ?? params.get("source") ?? "";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const requestedLocale = params.get("lang") ?? params.get("locale");
    if (requestedLocale === "zh" || requestedLocale === "en") {
      setLocale(requestedLocale);
      setForm((prev) => ({ ...prev, locale: requestedLocale, language_preference: requestedLocale }));
    }
  }, []);

  useEffect(() => {
    void postJson("/api/events", {
      name: "page_view",
      locale,
      properties: { source, variant: form.variant }
    }).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function track(name: string, properties: Record<string, unknown> = {}) {
    void postJson("/api/events", {
      name,
      locale,
      properties: { source, variant: form.variant, ...properties }
    }).catch(() => undefined);
  }

  function updateLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    setForm((prev) => ({ ...prev, locale: nextLocale, language_preference: nextLocale }));
    track("language_toggled", { to: nextLocale });
  }

  function updateField<K extends keyof IntakePayload>(key: K, value: IntakePayload[K]) {
    if (!startedRef.current && ["idea", "product_url"].includes(String(key)) && String(value).trim()) {
      startedRef.current = true;
      track("hero_idea_started");
    }
    setForm((prev) => ({ ...prev, [key]: value, source }));
  }

  async function generateDiagnosis() {
    const idea = form.idea.trim() || form.product_url?.trim();
    if (!idea) {
      setMessage(c.form.required);
      return;
    }

    setLoading(true);
    setMessage("");
    track("diagnostic_started", { stage: form.product_stage });
    try {
      const intakePayload = {
        ...form,
        idea: form.idea.trim() || `Review product at ${form.product_url}`,
        problem: form.problem || form.evidence_links || form.biggest_uncertainty || form.idea,
        source
      };
      const intakeResult = await postJson<{ intake: { id: string } }>("/api/intake", intakePayload);
      const diagnosisResult = await postJson<{ diagnosis: Diagnosis; reportUrl: string }>("/api/diagnose", {
        intakeId: intakeResult.intake.id
      });
      setDiagnosis(diagnosisResult.diagnosis);
      setReportUrl(diagnosisResult.reportUrl);
      requestAnimationFrame(() => document.getElementById("diagnosis-preview")?.scrollIntoView({ block: "center" }));
    } catch {
      setMessage(c.form.required);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    if (!email.trim()) {
      setMessage(locale === "zh" ? "请填写邮箱。" : "Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      await postJson("/api/lead", {
        email,
        locale,
        idea: form.idea || form.product_url,
        intakeId: diagnosis?.intakeId,
        diagnosisId: diagnosis?.id,
        source,
        variant: form.variant
      });
      setMessage(c.form.saved);
    } finally {
      setLoading(false);
    }
  }

  async function startPaidIntent(tier: string) {
    track("pricing_viewed", { tier });
    setLoading(true);
    try {
      const result = await postJson<{ checkoutUrl?: string; manual: boolean; message: string }>("/api/checkout", {
        locale,
        tier,
        email,
        intakeId: diagnosis?.intakeId,
        diagnosisId: diagnosis?.id,
        source
      });
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setMessage(result.message);
        requestAnimationFrame(() => document.getElementById("case-intake")?.scrollIntoView({ block: "center" }));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <Header locale={locale} c={c} updateLocale={updateLocale} />

      <section className="hero-frame" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{c.hero.badge}</p>
          <h1>
            {c.hero.h1A} <span>{c.hero.h1Bet}</span> {c.hero.h1B}
          </h1>
          <p className="hero-subcopy">{c.hero.subcopy}</p>

          <div className="trust-metrics" aria-label={locale === "zh" ? "信任提示" : "Trust signals"}>
            {c.hero.trust.map((item) => (
              <div className="trust-metric" key={item.title}>
                <b>{item.title}</b>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>

          <div className="quick-diagnosis">
            <input
              value={form.idea}
              placeholder={c.hero.inputPlaceholder}
              onChange={(event) => updateField("idea", event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void generateDiagnosis();
              }}
            />
            <button className="button primary" onClick={generateDiagnosis} disabled={loading}>
              {loading ? "..." : c.hero.primary} <span aria-hidden="true">-&gt;</span>
            </button>
          </div>

          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true">
              {["D", "A", "M", "L", "N"].map((letter) => (
                <span key={letter}>{letter}</span>
              ))}
            </div>
            <small>{c.hero.social}</small>
          </div>

          <p className="hero-footnote">
            {c.hero.noteA}
            <br />
            {c.hero.noteB}
          </p>
        </div>

        <div className="hero-product">
          <DiagnosticConsole
            locale={locale}
            c={c}
            form={form}
            preview={preview}
            generateDiagnosis={generateDiagnosis}
            loading={loading}
          />
          <EvidenceLedger c={c} locale={locale} />
        </div>
      </section>

      <CaseIntake
        c={c}
        locale={locale}
        form={form}
        email={email}
        preview={preview}
        reportUrl={reportUrl}
        message={message}
        loading={loading}
        updateField={updateField}
        setEmail={setEmail}
        generateDiagnosis={generateDiagnosis}
        submitLead={submitLead}
        startPaidIntent={startPaidIntent}
      />

      <MethodSection c={c} />
      <SampleSection c={c} />
      <ProofSection c={c} />
      <PricingSection c={c} locale={locale} loading={loading} startPaidIntent={startPaidIntent} />
      <FaqSection c={c} />

      <footer className="footer">
        <strong>IndiePM Clinic</strong>
        <span>{c.footer}</span>
      </footer>
    </main>
  );
}

function Header({
  locale,
  c,
  updateLocale
}: {
  locale: Locale;
  c: PageCopy;
  updateLocale: (locale: Locale) => void;
}) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="IndiePM Clinic home">
        <span className="brand-mark">*</span>
        <strong>IndiePM Clinic</strong>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#how">{c.nav.how}</a>
        <a href="#pricing">{c.nav.pricing}</a>
        <a href="#sample">{c.nav.sample}</a>
        <a href="#case-studies">{c.nav.cases}</a>
        <a href="#faq">{c.nav.faq}</a>
      </nav>
      <div className="nav-actions">
        <div className="locale-menu" aria-label="Language">
          <span aria-hidden="true">◎</span>
          <button onClick={() => updateLocale(locale === "en" ? "zh" : "en")}>{locale === "en" ? "EN" : "中文"}</button>
        </div>
        <a className="login-link" href="#case-intake">
          {c.nav.login}
        </a>
        <a className="button compact primary" href="#pricing">
          {c.nav.cta}
        </a>
      </div>
    </header>
  );
}

function DiagnosticConsole({
  locale,
  c,
  form,
  preview,
  generateDiagnosis,
  loading
}: {
  locale: Locale;
  c: PageCopy;
  form: IntakePayload;
  preview: PreviewDiagnosis;
  generateDiagnosis: () => Promise<void>;
  loading: boolean;
}) {
  const risks = riskCards(preview, locale);
  const gathered = preview.evidence_strength === "strong" ? 14 : preview.evidence_strength === "medium" ? 6 : 2;
  const total = 18;
  const intakeRows = [
    [c.console.stage, stageLabels[form.product_stage][locale]],
    [c.console.product, short(form.solution_guess, locale === "zh" ? "AI notes for founders" : "AI notes for founders")],
    [c.console.target, short(form.target_user, locale === "zh" ? "独立开发者" : "Solo founders")],
    [c.console.problem, short(form.problem || form.idea, locale === "zh" ? "收集并连接分散洞察" : "Capture & connect insights across scattered notes")],
    [c.console.solution, short(form.solution_guess, locale === "zh" ? "AI notes assistant" : "AI notes assistant")],
    [c.console.traction, short(form.current_traction, locale === "zh" ? "900 访问 / 33 注册 / 0 付费" : "900 visitors / 33 signups / 0 paid users")],
    [c.console.uncertainty, short(form.biggest_uncertainty, c.console.paymentIntent)]
  ];

  return (
    <section className="diagnostic-console" id="diagnosis-preview" aria-label={c.console.title}>
      <div className="console-top">
        <div className="case-title">
          <span className="case-arrow">›</span>
          <strong>{c.console.title}</strong>
          <small>• {c.console.unsaved}</small>
        </div>
        <div className="case-status">
          <StatusPill label={c.console.confidence} value={preview.confidence} locale={locale} />
          <StatusPill label={c.console.evidence} value={`${gathered}/${total}`} locale={locale} neutral />
          <StatusPill label={c.console.prdGate} value={preview.prd_gate} locale={locale} />
        </div>
      </div>

      <div className="console-grid">
        <div className="console-panel intake-panel">
          <PanelTitle number="1" title={c.console.intake} />
          <div className="intake-list">
            {intakeRows.map(([label, value], index) => (
              <div className="intake-row" key={label}>
                <span>{consoleIcon(index)}</span>
                <div>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>
          <a className="button secondary full" href="#case-intake">
            {c.console.editIntake}
          </a>
        </div>

        <div className="console-panel reasoning-panel">
          <PanelTitle number="2" title={c.console.reasoning} />
          <div className="reasoning-block">
            <h3>{c.console.framing}</h3>
            <div className="bet-card">
              <span>{c.console.betStatement}</span>
              <p>{preview.bet_statement}</p>
            </div>
          </div>

          <div className="reasoning-block">
            <h3>{c.console.risks}</h3>
            <div className="risk-grid">
              {risks.map((risk) => (
                <div className="risk-card" key={risk.label}>
                  <span>{risk.label}</span>
                  <b className={riskClass(risk.level)}>{statusLabel(risk.level, locale)}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="assumption-card">
            <span>{c.console.riskiest}</span>
            <strong>{preview.riskiest_assumption}</strong>
          </div>

          <div className="evidence-progress">
            <div>
              <span>{c.console.evidenceCheck}</span>
              <small>
                {gathered} / {total} {locale === "zh" ? "已收集" : "gathered"}
              </small>
            </div>
            <b style={{ width: `${Math.round((gathered / total) * 100)}%` }} />
          </div>

          <div className="needed-grid">
            <span>{c.console.stillNeed}</span>
            <div>
              <button>{c.console.paymentTest}</button>
              <button>{c.console.interview}</button>
              <button>{c.console.competitorGap}</button>
            </div>
          </div>
        </div>

        <div className="console-panel diagnosis-panel">
          <PanelTitle number="3" title={c.console.diagnosis} />
          <div className="decision-box">
            <div>
              <span>{c.console.decision}</span>
              <strong>{decisionLabel(preview.decision, locale)}</strong>
            </div>
            <span className="scale-mark" aria-hidden="true">
              ⚖
            </span>
          </div>

          <div className="diagnosis-copy">
            <span>{c.console.why}</span>
            <p>{preview.summary}</p>
          </div>

          <button className="next-action-card" onClick={generateDiagnosis} disabled={loading}>
            <span>
              <strong>{c.console.nextBest}</strong>
              <small>{preview.next_action}</small>
            </span>
            <b aria-hidden="true">›</b>
          </button>

          <div className="change-list">
            <span>{c.console.change}</span>
            {(locale === "zh"
              ? ["3+ 付款或订金", "访谈证明强痛点", "竞品缺口带付费信号"]
              : ["3+ deposits or preorders", "Interview proof of painful problem", "Competitor gap with WTP signal"]
            ).map((item) => (
              <div key={item}>
                <b>✓</b>
                <small>{item}</small>
              </div>
            ))}
          </div>

          <div className="prd-gate-card">
            <strong>
              {c.console.prdGate}: {statusLabel(preview.prd_gate, locale)}
            </strong>
            <span>{c.console.blockedNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function consoleIcon(index: number) {
  return ["□", "◇", "◎", "?", "✦", "↗", "△"][index] ?? "•";
}

function PanelTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="panel-heading">
      <span>{number}</span>
      <strong>{title}</strong>
    </div>
  );
}

function StatusPill({
  label,
  value,
  locale,
  neutral = false
}: {
  label: string;
  value: string;
  locale: Locale;
  neutral?: boolean;
}) {
  return (
    <div className="status-pill">
      <span>{label}</span>
      <b className={neutral ? "neutral" : statusClass(value)}>{neutral ? value : statusLabel(value, locale)}</b>
    </div>
  );
}

function EvidenceLedger({ c, locale }: { c: PageCopy; locale: Locale }) {
  return (
    <section className="ledger-preview" aria-label={c.ledger.eyebrow}>
      <div className="ledger-intro">
        <span>{c.ledger.eyebrow}</span>
        <h2>{c.ledger.title}</h2>
        <p>{c.ledger.copy}</p>
        <a href="#sample">{c.ledger.seeAll}</a>
      </div>
      {ledgerRows[locale].map((item) => (
        <article className="ledger-card" key={item.type}>
          <div>
            <span>{item.type}</span>
            <b className={statusClass(item.strength)}>{statusLabel(item.strength, locale)}</b>
          </div>
          <p>{item.quote}</p>
          <small>
            {item.source}
            <br />
            {item.age}
          </small>
          <em aria-hidden="true">↗</em>
        </article>
      ))}
    </section>
  );
}

function CaseIntake({
  c,
  locale,
  form,
  email,
  preview,
  reportUrl,
  message,
  loading,
  updateField,
  setEmail,
  generateDiagnosis,
  submitLead,
  startPaidIntent
}: {
  c: PageCopy;
  locale: Locale;
  form: IntakePayload;
  email: string;
  preview: PreviewDiagnosis;
  reportUrl: string;
  message: string;
  loading: boolean;
  updateField: <K extends keyof IntakePayload>(key: K, value: IntakePayload[K]) => void;
  setEmail: (email: string) => void;
  generateDiagnosis: () => Promise<void>;
  submitLead: () => Promise<void>;
  startPaidIntent: (tier: string) => Promise<void>;
}) {
  const paidTier = locale === "zh" ? "beta_lite" : "founder";
  return (
    <section className="section intake-section" id="case-intake">
      <div className="section-intro">
        <p className="eyebrow">{c.form.title}</p>
        <h2>{c.form.copy}</h2>
      </div>

      <div className="intake-workspace">
        <div className="intake-form">
          <label className="wide">
            {c.form.idea}
            <textarea
              value={form.idea}
              placeholder={c.form.ideaPlaceholder}
              onChange={(event) => updateField("idea", event.target.value)}
            />
          </label>
          <label>
            {c.form.url}
            <input
              value={form.product_url}
              placeholder={c.form.urlPlaceholder}
              onChange={(event) => updateField("product_url", event.target.value)}
            />
          </label>
          <label>
            {c.form.stage}
            <select
              value={form.product_stage}
              onChange={(event) => updateField("product_stage", event.target.value as ProductStage)}
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stageLabels[stage][locale]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {c.form.target}
            <input
              value={form.target_user}
              placeholder={c.form.targetPlaceholder}
              onChange={(event) => updateField("target_user", event.target.value)}
            />
          </label>
          <label>
            {c.form.problem}
            <input
              value={form.problem}
              placeholder={c.form.problemPlaceholder}
              onChange={(event) => updateField("problem", event.target.value)}
            />
          </label>
          <label>
            {c.form.solution}
            <input
              value={form.solution_guess}
              placeholder={c.form.solutionPlaceholder}
              onChange={(event) => updateField("solution_guess", event.target.value)}
            />
          </label>
          <label>
            {c.form.traction}
            <input
              value={form.current_traction}
              placeholder={c.form.tractionPlaceholder}
              onChange={(event) => updateField("current_traction", event.target.value)}
            />
          </label>
          <label className="wide">
            {c.form.evidence}
            <textarea
              value={form.evidence_links}
              placeholder={c.form.evidencePlaceholder}
              onChange={(event) => updateField("evidence_links", event.target.value)}
            />
          </label>
          <label className="wide">
            {c.form.uncertainty}
            <input
              value={form.biggest_uncertainty}
              placeholder={c.form.uncertaintyPlaceholder}
              onChange={(event) => updateField("biggest_uncertainty", event.target.value)}
            />
          </label>
        </div>

        <aside className="intake-summary">
          <div className="decision-summary">
            <span>{c.console.decision}</span>
            <strong>{decisionLabel(preview.decision, locale)}</strong>
            <p>{preview.summary}</p>
          </div>
          <label>
            {c.form.email}
            <input value={email} placeholder={c.form.emailPlaceholder} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <div className="action-stack">
            <button className="button primary full" onClick={generateDiagnosis} disabled={loading}>
              {loading ? "..." : c.form.generate}
            </button>
            <button className="button secondary full" onClick={submitLead} disabled={loading}>
              {c.form.save}
            </button>
            {reportUrl ? (
              <a className="button secondary full" href={reportUrl}>
                {c.form.report}
              </a>
            ) : null}
            <button className="button primary full" onClick={() => startPaidIntent(paidTier)} disabled={loading}>
              {c.form.paid}
            </button>
          </div>
          {message ? <p className="notice">{message}</p> : null}
        </aside>
      </div>
    </section>
  );
}

function MethodSection({ c }: { c: PageCopy }) {
  return (
    <section className="section" id="how">
      <SectionIntro eyebrow={c.method.eyebrow} title={c.method.title} copy={c.method.copy} />
      <div className="method-grid">
        {c.method.steps.map(([title, body], index) => (
          <article className="method-card" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SampleSection({ c }: { c: PageCopy }) {
  return (
    <section className="section" id="sample">
      <SectionIntro eyebrow={c.sample.eyebrow} title={c.sample.title} copy={c.sample.copy} />
      <div className="sample-grid">
        <article className="sample-report">
          {c.sample.rows.map(([label, body]) => (
            <div key={label}>
              <span>{label}</span>
              <p>{body}</p>
            </div>
          ))}
          <strong>{c.sample.noPrd}</strong>
        </article>
        <article className="receive-card">
          <span>Deliverables</span>
          {c.sample.receives.map((item) => (
            <div className="check-row" key={item}>
              <b>✓</b>
              <strong>{item}</strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function ProofSection({ c }: { c: PageCopy }) {
  return (
    <section className="section" id="case-studies">
      <SectionIntro eyebrow={c.proof.eyebrow} title={c.proof.title} copy={c.proof.copy} />
      <div className="proof-card-grid">
        {c.proof.cards.map(([title, body], index) => (
          <article className="proof-card" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection({
  c,
  locale,
  loading,
  startPaidIntent
}: {
  c: PageCopy;
  locale: Locale;
  loading: boolean;
  startPaidIntent: (tier: string) => Promise<void>;
}) {
  return (
    <section className="section" id="pricing">
      <SectionIntro eyebrow={c.pricing.eyebrow} title={c.pricing.title} copy={c.pricing.copy} />
      <div className="pricing-grid">
        {c.pricing.cards.map((card) => (
          <article className={`price-card ${card.featured ? "featured" : ""}`} key={card.tier}>
            <span>{card.title}</span>
            <strong>{card.price}</strong>
            <p>{card.description}</p>
            <div className="price-list">
              {card.items.map((item) => (
                <div className="check-row" key={item}>
                  <b>✓</b>
                  <small>{item}</small>
                </div>
              ))}
            </div>
            <button className="button primary full" onClick={() => startPaidIntent(card.tier)} disabled={loading}>
              {card.cta}
            </button>
          </article>
        ))}
      </div>
      <div className="payment-note">
        <strong>{locale === "zh" ? "付款说明" : "Payment note"}</strong>
        <span>{c.pricing.note}</span>
      </div>
      <div className="after-apply">
        {c.pricing.afterApply.map((item, index) => (
          <span key={item}>
            <b>{index + 1}</b>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ c }: { c: PageCopy }) {
  return (
    <section className="section" id="faq">
      <SectionIntro eyebrow={c.faq.eyebrow} title={c.faq.title} />
      <div className="faq-grid">
        {c.faq.items.map(([question, answer]) => (
          <article className="faq-item" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy: body }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
