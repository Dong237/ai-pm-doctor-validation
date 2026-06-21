import Link from "next/link";
import { getStore } from "@/src/lib/store";

export const dynamic = "force-dynamic";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const diagnosis = getStore().diagnoses.get(id);

  if (!diagnosis) {
    return (
      <main className="report-shell">
        <section className="report-card">
          <p className="eyebrow">Report not found</p>
          <h1>This diagnosis is not available in local memory.</h1>
          <p>
            The V1 app uses mock in-memory storage. Generate a new preview in the same dev
            session to view a report.
          </p>
          <Link className="button primary" href="/">
            Back to diagnostic
          </Link>
        </section>
      </main>
    );
  }

  const locale = diagnosis.locale;
  const labels =
    locale === "zh"
      ? {
          title: "产品诊断报告",
          decision: "决策",
          confidence: "信心",
          evidence: "证据强度",
          risk: "最大风险",
          next: "下一步",
          gate: "构建门槛",
          result: "诊断结果",
          bet: "产品 Bet",
          change: "什么会改变判断",
          back: "返回"
        }
      : {
          title: "AI PM Doctor",
          decision: "Decision",
          confidence: "Confidence",
          evidence: "Evidence",
          risk: "Riskiest Assumption",
          next: "Next Action",
          gate: "Build Gate",
          result: "Diagnosis result",
          bet: "Product Bet",
          change: "What Would Change This",
          back: "Back"
        };

  return (
    <main className="report-shell">
      <section className="report-card">
        <p className="eyebrow">{labels.title}</p>
        <h1>{labels.result}</h1>
        <p className="muted">{diagnosis.summary}</p>

        <div className="report-bet">
          <span>{labels.bet}</span>
          <p>{diagnosis.bet_statement}</p>
        </div>

        <div className="report-grid">
          <div>
            <span>{labels.decision}</span>
            <strong>{diagnosis.decision.toUpperCase()}</strong>
          </div>
          <div>
            <span>{labels.confidence}</span>
            <strong>{diagnosis.confidence}</strong>
          </div>
          <div>
            <span>{labels.evidence}</span>
            <strong>{diagnosis.evidence_strength}</strong>
          </div>
          <div>
            <span>{labels.gate}</span>
            <strong>{diagnosis.prd_gate}</strong>
          </div>
        </div>

        <div className="report-section">
          <h2>{labels.risk}</h2>
          <p>{diagnosis.riskiest_assumption}</p>
        </div>
        <div className="report-section">
          <h2>{labels.next}</h2>
          <p>{diagnosis.next_action}</p>
        </div>
        <div className="report-section">
          <h2>{labels.change}</h2>
          <p>{diagnosis.what_would_change}</p>
        </div>

        <Link className="button secondary" href="/">
          {labels.back}
        </Link>
      </section>
    </main>
  );
}
