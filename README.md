# David

David is an AI PM coworker for indie builders.

It helps founders turn messy ideas, scattered market signals, and product uncertainty into evidence-backed product judgment: what the Bet is, what risk matters most, whether to build, test, kill, narrow, wait, or iterate, and what PM action should happen next.

## The Problem

AI coding tools have made building dramatically faster. A solo builder can now create a landing page, prototype, or app in hours.

But faster building creates a new bottleneck:

- What is actually worth building?
- Who exactly is the product for?
- Is the pain real or just interesting?
- Is there evidence of behavior, urgency, or willingness to pay?
- Should the founder write a spec, run a test, narrow the ICP, change positioning, or stop?
- After launch, what did the market actually teach us?

Most beginner indie builders do not lack execution tools. They lack senior product judgment.

## What We Are Building

David is not a PRD generator, idea generator, roadmap tool, generic chatbot, or coding agent.

David sits before and after coding tools. It improves the product decision that gets handed into tools like Cursor, Claude Code, Lovable, Bolt, Replit, or Trae.

The intended workflow is:

```text
messy input
-> Bet framing
-> evidence ledger
-> risk diagnosis
-> build / test / kill / narrow / wait / iterate decision
-> next PM action
-> artifact
-> memory
```

The core object is a Bet:

```text
I believe user X has problem Y.
Solution Z can create value and business outcome B.
This is supported or disproven by evidence E.
The riskiest assumption is A.
The next action is N.
```

## Why This Is Different

Most products in this space start too late or stop too early:

- PRD tools assume the decision to build is already correct.
- Coding agents can build quickly, but they do not know whether the product Bet deserves build time.
- Research tools collect signals, but they often do not turn those signals into a clear product decision.
- Generic chatbots can sound plausible, but they do not preserve evidence, memory, risk, and decision history as a product system.

David's value is the missing middle: evidence-backed PM judgment for solo builders.

The product should behave like a senior PM coworker:

- diagnose the founder's current situation
- frame the Bet
- inspect evidence
- name the riskiest assumption
- block premature specs when evidence is weak
- generate the next useful PM action
- remember decisions, tests, and outcomes

## Current State

This repo currently contains two things:

1. Product truth: specs, design direction, and research about the AI PM coworker.
2. A working Next.js validation prototype.

The validation prototype is a middle test. It is not the final product UX.

The current landing page exists to test whether founders want a paid/manual PM diagnosis before we build the full product. It helps us validate demand, pricing, trust, and the core promise.

What works today:

- bilingual validation page
- case intake form
- rule-based diagnosis preview
- report page for generated previews
- lead capture
- paid diagnosis intent capture
- optional Stripe payment links
- optional webhook delivery to an external sink

What is still missing:

- durable database
- real evidence ingestion
- source-backed Evidence Ledger
- LLM/agent PM reasoning workflow
- product memory
- authentication and workspaces
- admin/review workflow for manual diagnosis
- automated tests beyond typecheck/build

## Roadmap

Next:

- deploy the validation prototype
- capture real founder cases, leads, and paid diagnosis intent
- replace in-memory storage with durable persistence
- review real cases manually to sharpen the diagnosis workflow

Next next:

- build the Evidence Ledger
- turn the rule-based preview into a real PM diagnosis workflow
- connect evidence, risk, decision, and next action into one durable product object
- add admin/review tools for diagnosis delivery

Later:

- add agentic research across market, competitor, community, review, and metric signals
- add memory across Bets, decisions, tests, launches, and outcomes
- generate evidence-backed specs only when the Bet is build-ready
- hand clean product context to coding agents

## Repository Structure

```text
app/                 Next.js app routes, pages, and API endpoints
src/                 Shared product/backend logic
assets/              Tracked product/design assets
docs/
  specs/             Product source of truth
  frontend/          Visual and UX direction
  backend/           API, data, architecture, and agent design notes
  research/          Market findings and accepted evidence
  repo/              Repo maps and operating notes
README.md            Product and repo introduction
package.json         Scripts and dependencies
```

Detailed structure: [docs/repo/repo-map.md](docs/repo/repo-map.md)

## Working Rule

Evidence comes before PRD.

If a Bet is not build-ready, David should generate the next evidence test instead of a premature build spec.

---

# David 中文说明

David 是一个面向独立开发者的 AI PM 同事。

它帮助创始人把混乱的想法、分散的市场信号和产品不确定性，转化成有证据支撑的产品判断：当前 Bet 是什么，最大的风险是什么，应该构建、测试、放弃、收窄、等待还是迭代，以及下一步应该做哪个 PM 动作。

## 我们解决什么问题

AI 编程工具让构建速度变得非常快。一个独立开发者现在可以在几个小时内做出落地页、原型或应用。

但构建变快之后，真正的瓶颈变成了产品判断：

- 到底什么值得做？
- 这个产品具体是给谁的？
- 痛点是真实存在，还是只是听起来有趣？
- 有没有行为、紧迫性或付费意愿的证据？
- 现在应该写规格、做测试、收窄用户、改定位，还是停掉？
- 上线之后，市场到底反馈了什么？

很多初级独立开发者并不缺执行工具，真正缺的是高级产品判断。

## 我们在做什么

David 不是 PRD 生成器、点子生成器、路线图工具、通用聊天机器人，也不是编程 Agent。

David 位于编程工具的前后。它提升的是交给 Cursor、Claude Code、Lovable、Bolt、Replit、Trae 等工具之前的产品判断质量，也帮助开发者在上线之后理解市场反馈。

目标工作流是：

```text
混乱输入
-> Bet 梳理
-> 证据账本
-> 风险诊断
-> 构建 / 测试 / 放弃 / 收窄 / 等待 / 迭代 决策
-> 下一步 PM 动作
-> 产物
-> 记忆
```

核心对象是 Bet：

```text
我相信用户 X 有问题 Y。
方案 Z 可以创造用户价值和业务结果 B。
这被证据 E 支持或反驳。
当前最大的风险假设是 A。
下一步动作是 N。
```

## 为什么不是别的工具

这个方向里很多产品要么开始得太晚，要么结束得太早：

- PRD 工具默认“应该构建”这个判断已经成立。
- 编程 Agent 可以快速构建，但不知道这个产品 Bet 是否值得投入构建时间。
- 研究工具可以收集信号，但往往不能把信号变成明确的产品决策。
- 通用聊天机器人可以给出听起来合理的建议，但不会把证据、记忆、风险和决策历史沉淀成一个产品系统。

David 的价值在中间层：为独立开发者提供有证据支撑的 PM 判断。

它应该像一个高级 PM 同事：

- 诊断创始人当前的产品处境
- 梳理 Bet
- 检查证据
- 找出最大的风险假设
- 在证据不足时阻止过早写规格
- 生成下一步真正有用的 PM 动作
- 记住决策、测试和结果

## 当前状态

这个仓库目前包含两部分：

1. 产品事实：规格、设计方向，以及关于 AI PM 同事的研究。
2. 一个可运行的 Next.js 验证原型。

当前验证原型只是一个中间测试，不是最终产品形态。

现在的落地页是为了验证：创始人是否愿意为人工/付费 PM 诊断付费，以及这个核心承诺、价格和信任表达是否成立。

今天已经具备：

- 中英文双语验证页
- 案例 intake 表单
- 基于规则的诊断预览
- 诊断报告页
- 邮箱线索收集
- 付费诊断意向收集
- 可选 Stripe 支付链接
- 可选 webhook 投递到外部系统

仍然缺少：

- 持久化数据库
- 真实证据采集
- 带来源的证据账本
- LLM/Agent 产品诊断工作流
- 产品记忆
- 登录、用户空间和工作区
- 人工诊断的后台审核/交付流程
- 除 typecheck/build 之外的自动化测试

## 路线图

下一步：

- 部署验证原型
- 收集真实创始人案例、线索和付费诊断意向
- 用持久化存储替代内存存储
- 人工复盘真实案例，打磨诊断流程

再下一步：

- 构建 Evidence Ledger 证据账本
- 把规则预览升级成真正的 PM 诊断工作流
- 将证据、风险、决策和下一步动作连接成一个持久化产品对象
- 增加人工诊断交付所需的后台工具

更后面：

- 加入面向市场、竞品、社区、评论和指标信号的 Agentic research
- 记住 Bet、决策、测试、上线和结果
- 只在 Bet 达到可构建状态时生成有证据支撑的规格
- 把干净的产品上下文交给编程 Agent

## 仓库结构

```text
app/                 Next.js 页面、路由和 API 入口
src/                 共享产品/后端逻辑
assets/              被追踪的产品和设计素材
docs/
  specs/             产品事实和核心规格
  frontend/          视觉与交互方向
  backend/           API、数据、架构和 Agent 设计说明
  research/          市场研究和已接受证据
  repo/              仓库地图和协作说明
README.md            产品和仓库介绍
package.json         脚本和依赖
```

详细结构见：[docs/repo/repo-map.md](docs/repo/repo-map.md)

## 工作原则

证据先于 PRD。

如果一个 Bet 还没达到可构建状态，David 应该生成下一步证据测试，而不是过早生成构建规格。
