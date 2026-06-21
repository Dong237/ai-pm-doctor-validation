# AI PM Research Workspace

This repo contains product research and early specs for an AI PM coworker for indie builders.

## Current Product Direction

Build an agentic PM app that turns scattered market signals into evidence-backed build / test / kill decisions.

The app should feel like a senior PM coworker:

- diagnose the founder's product situation
- frame the current Bet
- inspect evidence
- identify the riskiest assumption
- generate the next PM action
- remember decisions and outcomes

## Structure

| Path | Contents |
|---|---|
| `specs/` | Product principles and source-of-truth specs |
| `design/` | Locked visual direction and validation page design spec |
| `research/reports/` | Markdown landscape and market research reports |
| `research/landscape/` | HTML landscape visualizations |
| `references/` | PDFs and external essays used as references |
| `assets/images/` | Existing local images |

## Key Specs

- `specs/00_product_principles.md`
- `specs/01_target_users.md`
- `specs/02_user_scenarios.md`
- `specs/03_pm_reasoning_protocol.md`
- `specs/04_bet_model.md`
- `specs/05_evidence_model.md`
- `specs/06_decision_policy.md`

## Design Direction

- Validation page: Operator Clinic brand + Command Center workbench + Bilingual payment trust
- Locked design files:
  - `design/00_final_visual_direction.md`
  - `design/01_validation_page_design_spec.md`
- Future app UI can still use Precision Console where the product becomes a full PM workbench.
- Reports and PM memos can still use Editorial Founder OS where a reviewed case-file feel is needed.

## Working Rule

Evidence comes before PRD. If a Bet is not build-ready, generate the next evidence test.
