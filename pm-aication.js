(function () {
  "use strict";

  // --- Password gate ---
  var PASSWORD = "pmaication2026";

  function unlock() {
    var input = document.getElementById("pw");
    if (input.value === PASSWORD) {
      document.getElementById("gate").classList.add("hidden");
      document.getElementById("app").classList.add("visible");
      try { sessionStorage.setItem("pmauth", "1"); } catch (e) { /* private mode */ }
    } else {
      document.getElementById("pw-error").textContent = "Incorrect password";
      input.value = "";
      input.focus();
    }
  }

  // Auto-unlock if already authed this session
  try {
    if (sessionStorage.getItem("pmauth") === "1") {
      document.getElementById("gate").classList.add("hidden");
      document.getElementById("app").classList.add("visible");
    }
  } catch (e) { /* private mode */ }

  document.getElementById("gate-btn").addEventListener("click", unlock);
  document.getElementById("pw").addEventListener("keydown", function (e) {
    if (e.key === "Enter") unlock();
  });

  // --- Project data ---
  var projects = [
    {
      id: 1, name: "Agent 515 Weekly Synthesis", author: "Robbie Preswick",
      category: "automation",
      summary: "Built a Claude Code skill that SSHs into agent devbox and writes a weekly 515 from the agents\u2019 perspective, including feedback to the human operator. 34 sessions, 9 new skills shipped in one week.",
      tools: ["Claude Code", "Claude Code Skills", "Figma MCP", "Google Docs MCP", "Slack MCP"],
      wins: ["9 skills shipped in Innovation Day sprint", "Plan-then-implement pattern had near-100% completion rate", "Agent fleet model with 34 parallel sessions"],
      quote: "Every week @preswick asks us to do more, but this week the pattern shifted. Instead of one-off research, the dominant workstream was building tools that make future weeks faster.",
      visual: { bg: "linear-gradient(135deg, #1a1040, #2d1b69)", title: "Fleet model", detail: "One PM, 34 AI sessions", sub: "9 skills shipped in one sprint" },
    },
    {
      id: 2, name: "Machine Payments Coffee Order", author: "Jennifer Lee",
      category: "customer-facing",
      summary: "Used Claude Code with a Privy wallet funded via Stripe onramp to order and pay for coffee through a food ordering AI agent using stablecoins over machine payments (x402).",
      tools: ["Claude Code", "Privy wallet", "Stripe Onramp", "Machine Payments (x402)"],
      wins: ["End-to-end agent-to-agent commerce flow actually worked", "Stablecoin funding via onramp was fast", "Real-world purchase completed autonomously"],
      quote: "I just bought myself coffee today using Claude Code!!",
      visual: { bg: "linear-gradient(135deg, #1a3020, #0d4a2a)", title: "Agent commerce", detail: "AI bought real coffee", sub: "Agent-to-agent stablecoin payment" },
    },
    {
      id: 3, name: "Friction Point Aggregation Tool", author: "Alexandra Scolieri",
      category: "internal-tools",
      summary: "Built a Claude Code skill that parses feedback from friction log docs and Slack threads, extracts pain points, and populates a Google Sheet tracker for prioritizing Managed Payments improvements.",
      tools: ["Claude Code", "Claude Code Skills", "Google Sheets MCP", "Slack MCP"],
      wins: ["Parallel iteration with two Claude Code windows", "Reusable skill for ongoing use", "Converted plan to Google Doc for persistence"],
      quote: "Getting access to the right tools was my biggest hurdle.",
      visual: { bg: "linear-gradient(135deg, #1a1a40, #2b1560)", title: "Feedback synthesis", detail: "Pain points to spreadsheet", sub: "Auto-extracts friction from Slack + Docs" },
    },
    {
      id: 4, name: "SOC2 Report Sharing SaaS", author: "Dan Stokeley",
      category: "customer-facing",
      summary: "Built a full SaaS app for sharing SOC2 reports via URL at $0.50/download, including marketing site, multi-tenant signup with Stripe UBB, magic link access, NDA gating, and admin dashboard.",
      tools: ["Claude Code"],
      wins: ["Full SaaS built in 2\u20133 hours", "Casual input worked \u2014 Claude discerned intent reliably", "Hot-reloading was sweet"],
      quote: "Just generally the whole \u2018build me an app that could be a neat small business in 2\u20133 hours, where what I do mostly consists of entering Yes repeatedly\u2019.",
      visual: { bg: "linear-gradient(135deg, #2a1a10, #4a2a0a)", title: "Full SaaS", detail: "Entire business in an afternoon", sub: "Marketing + auth + billing + admin" },
    },
    {
      id: 5, name: "Smart Contract Analysis", author: "Meghna Mehta",
      category: "data-analysis",
      summary: "Used Claude to parse Morpho\u2019s fee wrapper smart contract to understand party rights in the vault, preparing for a meeting to discuss Privy\u2019s Morpho lending protocol integration.",
      tools: ["Claude"],
      wins: ["Quickly understood complex smart contract code", "Better prepared for technical meeting"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #0a1a3a, #0a2a5a)", title: "Contract parsing", detail: "Decoded vault rights in minutes", sub: "Morpho lending protocol analysis" },
    },
    {
      id: 6, name: "BashBoard", author: "Narek Tamoyan",
      category: "internal-tools",
      summary: "Built a structured bug bash tool replacing Google Doc workflow: Chrome extension for real-time capture, AI-powered triage dashboard, and one-click Jira export.",
      tools: ["Cursor", "Claude"],
      wins: ["Chrome extension + dashboard + Jira integration built in one day", "Agent team approach (Cursor + Claude)"],
      quote: "It replaces the Google Doc bug bash workflow with a structured end-to-end tool.",
      visual: { bg: "linear-gradient(135deg, #1a2030, #1a3050)", title: "Bug bash 2.0", detail: "Capture, triage, export", sub: "Extension + dashboard + Jira in one day" },
    },
    {
      id: 7, name: "AI-Optimized PM Workflows", author: "Josh Ackerman",
      category: "automation",
      summary: "Multiple AI workflow optimizations: Claude Code for Hubble queries (5\u201310 agents in parallel), go/chat for answering PSO questions, meeting note summaries, SOKR updates, NotebookLM for user feedback.",
      tools: ["Claude Code", "go/chat", "NotebookLM", "KCM Review Agent", "Hubble MCP"],
      wins: ["5\u201310 parallel Claude Code agents for queries", "Text expander + go/chat for meeting summaries", "NotebookLM for user feedback synthesis"],
      quote: "Wait a second, am I now the prompt-er or am I being prompt-ed? Who is the agent here?!",
      visual: { bg: "linear-gradient(135deg, #2a2010, #3a3010)", title: "Parallel agents", detail: "10 agents, one PM", sub: "Hubble, meetings, SOKRs, feedback" },
    },
    {
      id: 8, name: "Radar for Platforms Sales Support", author: "Alisa Noll",
      category: "internal-tools",
      summary: "Built three sales tools: an agent developing pitch/pricing/ROI for Connect platforms, an alert agent that Slacks when platforms have risky accounts, and a fraud attack dashboard from support tickets.",
      tools: ["Claude Code", "Slack MCP"],
      wins: ["Three distinct tools built in one day", "Direct sales pipeline applications"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #2a0a1a, #4a0a2a)", title: "Sales toolkit", detail: "Pitch, alert, investigate", sub: "Three fraud + sales tools in one day" },
    },
    {
      id: 9, name: "Easy Point of Sale", author: "Kate Brennan",
      category: "customer-facing",
      summary: "Built a web-based POS accepting in-person payments with Stripe Terminal (including unreleased Reader T600) in ~90 minutes using Replit and Claude Code.",
      tools: ["Replit", "Claude Code", "Stripe Terminal", "Gemini"],
      wins: ["Built in ~90 minutes", "Claimable sandboxes for seamless Replit integration", "Demonstrates empathy with user jobs-to-be-done"],
      quote: "Nearly 5% of Terminal lost deals are due to \u2018not enough engineering resources to build a custom point of sale\u2019. Let\u2019s equip our future users to build faster.",
      visual: { bg: "linear-gradient(135deg, #0a2a1a, #0a4a2a)", title: "POS prototype", detail: "Tap-to-pay in 90 minutes", sub: "Terminal T600 + web POS" },
    },
    {
      id: 10, name: "Soura \u2014 Relationship Health Check", author: "Jennifer Lee",
      category: "internal-tools",
      summary: "Built a personal analytics tool that scans Slack DMs and Google Calendar to surface relationship health insights with a Soura Score (0\u2013100), per-conversation breakdowns, anomaly flags, and PM mode.",
      tools: ["Claude Code", "Slack API", "Google Calendar API"],
      wins: ["Iterative sculpting workflow felt natural", "Background processing solved rate limiting", "Metrics-first, privacy-minded design"],
      quote: "It felt like sculpting: \u2018more like this, less like that\u2019 until it clicked.",
      visual: { bg: "linear-gradient(135deg, #1a0a30, #3a0a50)", title: "Soura Score", detail: "Score your relationships", sub: "DM + calendar health analytics" },
    },
    {
      id: 11, name: "VAT ID Pattern Validation", author: "Rutvij Oza",
      category: "customer-facing",
      summary: "Modified production code to detect suspicious VAT ID patterns (repetitions, sequences, repeating patterns) on checkout before hitting verification APIs. 17 passing tests.",
      tools: ["Claude Code"],
      wins: ["Asking \u2018why\u2019 questions saved days of work", "Simple frontend approach beat complex devbox orchestration", "300 lines of TypeScript with 17 tests"],
      quote: "Architecture > code speed: The backend implementation was technically correct but architecturally wrong. AI writes code fast, but you need to guide the approach.",
      visual: { bg: "linear-gradient(135deg, #0a1a2a, #1a2a3a)", title: "Fraud detection", detail: "Caught fake VATs at checkout", sub: "Production code + 17 passing tests" },
    },
    {
      id: 12, name: "VAT/GST Registration Advisor", author: "Aleksandra Bal",
      category: "customer-facing",
      summary: "Built a web app helping merchants determine VAT/GST registration obligations via questionnaire. Covers EU, UK, Australia with 48 jurisdiction-specific rules.",
      tools: ["Claude Code"],
      wins: ["Thorough planning (4h) made build phase fast (2h)", "Tax specialist domain expertise ensured accurate rules", "Simple tech stack (Flask, TSV flat file for rules)"],
      quote: "A key takeaway: thorough upfront planning makes the build phase significantly easier.",
      visual: { bg: "linear-gradient(135deg, #1a2a1a, #2a3a1a)", title: "Tax advisor", detail: "48 jurisdictions, one questionnaire", sub: "EU, UK, Australia VAT/GST rules" },
    },
    {
      id: 13, name: "RISA Compliance Survey Refresh", author: "Daniel Heffernan",
      category: "automation",
      summary: "Multi-week production project: removed 4 of 5 redundant RISA compliance questions from Japanese merchant onboarding. 8 PRs across backend, frontend, partner pipelines, and synthetics.",
      tools: ["Claude (Cursor)", "Claude Code"],
      wins: ["Speed on mechanical work \u2014 hours reduced to minutes", "Human review caught a real pre-existing stale data bug", "Iterative collaboration \u2014 Claude adapted when pushed back"],
      quote: "I treated Cursor w/ Claude as a smart engineer and acted as the EM, and it solved it.",
      visual: { bg: "linear-gradient(135deg, #2a1a0a, #3a2a0a)", title: "Production PRs", detail: "8 PRs across the full stack", sub: "Backend + frontend + partner pipelines" },
    },
    {
      id: 14, name: "Stripe Japan X Monitor", author: "Daniel Heffernan",
      category: "internal-tools",
      summary: "Built an LLM-powered RSS feed monitoring Japanese X posts about Stripe, filtering spam via GPT-4o-mini on val.town, posting to Slack. $0/month to operate.",
      tools: ["Claude Code", "val.town", "RSS.app", "GPT-4o-mini", "Superwhisper"],
      wins: ["Rapid exploration of 3 solution spaces in one day", "Discovery through AI \u2014 found val.town built-in OpenAI access", "$0/month on free tiers"],
      quote: "For a PM who can read code and has opinions about what should be built, AI coding assistants are transformative.",
      visual: { bg: "linear-gradient(135deg, #2a0a0a, #4a1010)", title: "Social monitor", detail: "Free social listening at scale", sub: "Japanese X \u2192 Slack via LLM filter" },
    },
    {
      id: 15, name: "Shelf Help Books", author: "Gary Pelissier",
      category: "customer-facing",
      summary: "Built a live e-commerce bookstore (shelfhelpbooks.shop) using only AI tools to dogfood Stripe\u2019s Local Payment Methods, Dynamic Payment Methods, and Checkout optimization. Full storefront assembled in 35 minutes.",
      tools: ["Lovable", "ChatGPT", "Stripe Checkout", "Dynamic Payment Methods"],
      wins: ["Fully functional live storefront in under 35 minutes", "Tested Dynamic Payment Methods including Affirm threshold logic", "Exposed real UX pain point: Stripe approval took longer than the entire build"],
      quote: "Time to build an online merchant: 20 mins. Time to integrate Stripe: 10 mins. Time for Stripe to approve my merchant: 2\u20133 days. This seems like a miss.",
      visual: { bg: "linear-gradient(135deg, #3a2010, #5a3520)", title: "LPM dogfood", detail: "Live store in 35 minutes", sub: "Bookshop testing Dynamic Payment Methods" },
    },
    {
      id: 16, name: "Terminal Dashboard Onboarding Prototype", author: "Denise Young",
      category: "internal-tools",
      summary: "Rapidly prototyped a new dynamic, user-intent-aware Terminal Dashboard Onboarding flow using Protodash, replacing the current static setup with one that adapts based on integration path.",
      tools: ["Protodash", "Claude Code"],
      wins: ["Full interactive onboarding prototype in under a day", "Protodash enforced Sail design language automatically", "Used Claude Code to locate Fox component source code for pixel-perfect recreation"],
      quote: "Screenshot-to-Code is super powerful. I fed the AI screenshots of our existing dashboard, and it recreated them as working React components with almost zero prompting.",
      visual: { bg: "linear-gradient(135deg, #0a2030, #1a3050)", title: "Smart onboarding", detail: "Adapts to how you integrate", sub: "Screenshot-to-code Terminal prototype" },
    },
    {
      id: 17, name: "Refund Friction Analyst", author: "Vighnesh Kumar Pathak",
      category: "internal-tools",
      summary: "Built two tools: a Protodash prototype surfacing L2/L3 missing/poor data quality in the Stripe dashboard, and an agent that tracks refund-related Slack DMs and builds a priority backlog from Jiras.",
      tools: ["Protodash", "Agent Builder (FinLLM)"],
      wins: ["Agent Builder easier to use than expected", "Protodash auto-implements in Stripe design style", "Dedicated AI-cation day reduced barrier to tool adoption"],
      quote: "Agent builder is a lot easier to use than I expected. I can definitely see myself delegating more work to agents.",
      visual: { bg: "linear-gradient(135deg, #1a1a30, #2a2a50)", title: "Data quality", detail: "Refund issues surfaced automatically", sub: "Dashboard prototype + Slack tracking agent" },
    },
    {
      id: 18, name: "3DS Product Suite", author: "Cip Blujdea",
      category: "automation",
      summary: "Built three things in one day: a GTM dashboard in Hubble for Authentication metrics, an improved Claude Code \u201CPM brain extension,\u201D and a FinLLM agent that answers 3D Secure questions and writes RFPs.",
      tools: ["Hubble", "Claude Code", "Agent Builder (FinLLM)"],
      wins: ["FinLLM agent auto-generates RFPs about 3D Secure", "Built a GTM dashboard for real-time product metrics", "Improved personal Claude Code PM brain system"],
      quote: "I built an agent that answers questions about my product and even writes RFPs about it, saving ~days of work in the future!",
      visual: { bg: "linear-gradient(135deg, #2a1020, #4a1a30)", title: "RFP machine", detail: "Agent that writes your RFPs", sub: "3DS expert + GTM dashboard + PM brain" },
    },
    {
      id: 19, name: "AI-cation Multi-Project", author: "Daniel Loke",
      category: "customer-facing",
      summary: "Built five experiments: an automated stand-up rotator, a \u201CBYO-LLM Stripe Data Assistant\u201D that lets merchants chat with their data (bypassing Sigma), a Lovable storefront with ACP, and Figma-to-code prototypes.",
      tools: ["Claude Code", "Lovable", "Stripe ACP", "Anthropic API", "Figma MCP", "Stripe Pages"],
      wins: ["Built a Stripe Data Assistant that poses a real question for Sigma", "Lovable one-shot the Stripe ACP integration from a single prompt", "Identified strategic insight: ACP growth is merchant-constrained"],
      quote: "I built a custom Stripe app that allows users to chat with their Stripe data\u2026 This effectively bypassed the need to pay for Stripe Sigma.",
      visual: { bg: "linear-gradient(135deg, #0a1a2a, #1a3040)", title: "Five experiments", detail: "Built a Sigma competitor", sub: "Data assistant + ACP shop + Figma-to-code" },
    },
    {
      id: 20, name: "Trial Email Bug Fix", author: "Oliver W.",
      category: "customer-facing",
      summary: "Closed a real customer escalation by fixing a trial email bug end-to-end using Claude Code \u2014 from escalation to merged PR in days, learning Stripe\u2019s architecture faster than any doc review.",
      tools: ["Claude Code"],
      wins: ["Resolved real customer escalation with merged PR", "Learned architecture faster than doc review", "Demonstrated PM-to-production pipeline"],
      quote: "It is extremely empowering to see how fast we can land customer impact with a real problem and learn our architecture faster than any doc review with AI.",
      visual: { bg: "linear-gradient(135deg, #1a2a20, #2a3a30)", title: "Customer fix", detail: "Escalation to merged PR", sub: "PM shipped production code via Claude" },
    },
    {
      id: 21, name: "Capital Weekly Periods Admin Fix", author: "Cecelia Shao",
      category: "internal-tools",
      summary: "Shipped 2 PRs to make Capital weekly periods render legibly on the admin page, after 6 session compressions and two late nights. Next: backend math for multi-period deferrals.",
      tools: ["Claude Code"],
      wins: ["Shipped 2 production PRs to admin page", "Persisted through 6 context compressions", "Unlocked multi-period deferral work"],
      quote: "There is light at the end of the tunnel y\u2019all.",
      visual: { bg: "linear-gradient(135deg, #2a1a30, #3a2a40)", title: "Admin overhaul", detail: "6 compressions, 2 PRs shipped", sub: "Capital weekly periods now readable" },
    },
    {
      id: 22, name: "Org-level Blueprints in Workbench", author: "David Wood",
      category: "customer-facing",
      summary: "Built a live fullstack demo of org-level Blueprints in Workbench for the Customer and Payment Method Sharing GA, including a new getting-started flow directing users to test sharing in a sandbox org.",
      tools: ["Claude Code"],
      wins: ["Live fullstack demo deployed end-to-end", "New getting-started flow for sandbox orgs", "Tooling enabled tackling a bigger project than expected"],
      quote: "Our tooling is so impressive and enabled me to tackle a much bigger project than I initially thought possible.",
      visual: { bg: "linear-gradient(135deg, #0a2a30, #1a3a40)", title: "Org Blueprints", detail: "Fullstack demo, live in Workbench", sub: "Customer + PM sharing getting-started flow" },
    },
    {
      id: 23, name: "Daily Meeting Brief Skill", author: "Jaeel",
      category: "automation",
      summary: "Built a /today-meetings Claude Code skill that pulls calendar events, scans public Slack channels, Google Drive, and Gmail for context, then sends a comprehensive day overview via Slack DM.",
      tools: ["Claude Code", "Toolshed OAuth", "Slack MCP", "Google Calendar", "Gmail"],
      wins: ["One command generates full daily briefing", "Cross-references multiple data sources for meeting context", "Actionable talking points per meeting"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #1a1a2a, #2a2a4a)", title: "Meeting prep", detail: "AI reads your whole day", sub: "Calendar + Slack + Drive + Gmail in one brief" },
    },
    {
      id: 24, name: "Connect Distribution Trends Agent", author: "David Yang",
      category: "data-analysis",
      summary: "Created a go/chat agent that analyzes Connect product distribution trends across six P0 products (Adaptive Pricing, LPMs, Capital, Billing, Instant Payouts, Terminal), outputs Google Docs, and plans to automate the MBR deck.",
      tools: ["go/chat Agent", "Hubble", "Google Docs MCP"],
      wins: ["Instant ONR trend analysis across 6 P0 products", "Auto-generates formatted Google Doc reports", "Roadmap to fully automate MBR deck creation"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #0a2a1a, #1a4a2a)", title: "P0 trends", detail: "Six products, one agent", sub: "Connect ONR trends \u2192 auto-generated MBR" },
    },
    {
      id: 25, name: "Money Management Mobile App", author: "Lola",
      category: "customer-facing",
      summary: "Built a rough prototype of a money management-only mobile app using Claude, deployed on Vercel. Left the experience feeling energized about what\u2019s possible.",
      tools: ["Claude", "Vercel"],
      wins: ["Functional mobile prototype deployed to Vercel", "Learned a lot through hands-on building", "Demonstrated mobile-first financial app concept"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #2a1a2a, #4a2a4a)", title: "Mobile finance", detail: "Money management in your pocket", sub: "Mobile app prototype on Vercel" },
    },
    {
      id: 26, name: "Instant Payouts Element Prototype", author: "Ha Lee",
      category: "customer-facing",
      summary: "Demoed a new Stripe Element for Instant Payouts that owns all eligibility checking, risk evaluation, UI, fee calculation, and payout submission \u2014 letting platforms enable IP in ~15 lines of code.",
      tools: ["Claude Code"],
      wins: ["Reduced Instant Payouts integration to ~15 lines of code", "Element owns eligibility, risk, fees, and submission", "Addresses 5% of Terminal lost deals due to engineering resource constraints"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #1a2a0a, #2a4a1a)", title: "IP Element", detail: "15 lines to enable Instant Payouts", sub: "Eligibility + risk + fees in one Element" },
    },
    {
      id: 27, name: "Connect Traits Explorer", author: "Ivan Ribeiro",
      category: "internal-tools",
      summary: "Built an internal Stripe Page (pages.stripe.me/trait-or-dare) to interactively explore Connect\u2019s configuration properties, which can be rough to navigate in documentation.",
      tools: ["Claude Code", "Stripe Pages"],
      wins: ["Live internal tool at pages.stripe.me/trait-or-dare", "Makes Connect traits navigable and explorable", "Fun UX for a traditionally dry config space"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #2a0a2a, #4a1a4a)", title: "Trait explorer", detail: "Connect config made navigable", sub: "Interactive traits tool on Stripe Pages" },
    },
    {
      id: 28, name: "Fund Flow Agent", author: "Hernan Herrera",
      category: "internal-tools",
      summary: "Built an agent that runs account assessments based on acct_ids and Hubble queries, generating detailed status reports. Includes a guide for use on devbox or local machine, with plans for a simplified CC plugin version.",
      tools: ["Claude Code", "Hubble"],
      wins: ["Automated account health assessment from acct_ids", "Works on devbox or local machine", "Generates detailed Google Doc reports per account"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #1a1a10, #2a2a20)", title: "Account health", detail: "Instant account assessments", sub: "Hubble queries + status reports from acct_ids" },
    },
    {
      id: 29, name: "Partner Reporting Platform Fix", author: "RK",
      category: "internal-tools",
      summary: "Used a Minion to write, test, and merge a PR on the Partner Reporting Platform \u2014 adding description display when selecting submission evidence categories to reduce user confusion.",
      tools: ["Minion"],
      wins: ["First merged PR using AI tooling", "Resolved real user confusion on PRP", "Ramped up on eng workflows (repos, devboxes, PRs) in the process"],
      quote: "After spending time ramping up, I felt it was rather straightforward and I feel empowered to take on more fixes at Stripe.",
      visual: { bg: "linear-gradient(135deg, #0a1a1a, #1a2a3a)", title: "Minion PR", detail: "PM merged production code", sub: "Partner Reporting Platform UX fix" },
    },
    {
      id: 30, name: "Product Changelog & Slack App", author: "Miles M.",
      category: "internal-tools",
      summary: "Built an updated product changelog and Slack app to increase user awareness of what Stripe ships. Addresses the gap in internal visibility of shipped features.",
      tools: ["Claude Code"],
      wins: ["Functional Slack app for shipping awareness", "Addresses real internal communication gap", "Built during PM-aication onsite sprint"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #1a0a2a, #2a1a3a)", title: "Ship awareness", detail: "Slack app for what we shipped", sub: "Product changelog + Slack notifications" },
    },
    {
      id: 31, name: "Enterprise Cost Management Prototype", author: "Paul Meagher",
      category: "customer-facing",
      summary: "Prototyped an org-level cost management experience for Enterprise users using a remote devbox with prod backend and Claude Code, making the design feel more Stripe-native than earlier v0 prototypes.",
      tools: ["Claude Code", "Remote Devbox"],
      wins: ["Stripe-native design vs earlier v0 prototypes", "Used prod backend for realistic prototyping", "Rapid iteration on Enterprise UX"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #2a2a0a, #3a3a1a)", title: "Cost management", detail: "Enterprise org-level prototype", sub: "Prod backend + Stripe-native design" },
    }
  ];

  var highlights = [
    { text: "I just bought myself coffee today using Claude Code!!", author: "Jennifer Lee", project: "Machine Payments Coffee Order" },
    { text: "Just generally the whole \u2018build me an app that could be a neat small business in 2\u20133 hours, where what I do mostly consists of entering Yes repeatedly\u2019.", author: "Dan Stokeley", project: "SOC2 Report Sharing SaaS" },
    { text: "Wait a second, am I now the prompt-er or am I being prompt-ed? Who is the agent here?!", author: "Josh Ackerman", project: "AI-Optimized PM Workflows" },
    { text: "It felt like sculpting: \u2018more like this, less like that\u2019 until it clicked.", author: "Jennifer Lee", project: "Soura" },
    { text: "For a PM who can read code and has opinions about what should be built, AI coding assistants are transformative.", author: "Daniel Heffernan", project: "Stripe Japan X Monitor" },
    { text: "Nearly 5% of Terminal lost deals are due to \u2018not enough engineering resources to build a custom point of sale\u2019. Let\u2019s equip our future users to build faster.", author: "Kate Brennan", project: "Easy Point of Sale" },
    { text: "Architecture > code speed: AI writes code fast, but you need to guide the approach.", author: "Rutvij Oza", project: "VAT ID Pattern Validation" },
    { text: "I treated Cursor w/ Claude as a smart engineer and acted as the EM, and it solved it.", author: "Daniel Heffernan", project: "RISA Compliance Survey" },
    { text: "The flywheel is starting to spin.", author: "Robbie Preswick", project: "Agent 515" },
    { text: "Time to build an online merchant: 20 mins. Time to integrate Stripe: 10 mins. Time for Stripe to approve my merchant: 2\u20133 days.", author: "Gary Pelissier", project: "Shelf Help Books" },
    { text: "Screenshot-to-Code is super powerful. I fed the AI screenshots of our existing dashboard, and it recreated them as working React components.", author: "Denise Young", project: "Terminal Onboarding" },
    { text: "I built an agent that answers questions about my product and even writes RFPs, saving ~days of work in the future!", author: "Cip Blujdea", project: "3DS Product Suite" },
    { text: "I built a custom Stripe app that allows users to chat with their Stripe data\u2026 effectively bypassing the need for Sigma.", author: "Daniel Loke", project: "AI-cation Multi-Project" },
    { text: "It is extremely empowering to see how fast we can land customer impact with a real problem and learn our architecture faster than any doc review.", author: "Oliver W.", project: "Trial Email Bug Fix" },
    { text: "There is light at the end of the tunnel y\u2019all.", author: "Cecelia Shao", project: "Capital Weekly Periods" },
    { text: "Our tooling is so impressive and enabled me to tackle a much bigger project than I initially thought possible.", author: "David Wood", project: "Org-level Blueprints" },
    { text: "After spending time ramping up, I felt it was rather straightforward and I feel empowered to take on more fixes at Stripe.", author: "RK", project: "Partner Reporting Platform Fix" }
  ];

  // --- Safe text helper (avoid innerHTML XSS) ---
  function esc(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // --- Carousel elements ---
  var carouselGrid = document.getElementById("projects-grid");
  var carouselPrev = document.getElementById("carousel-prev");
  var carouselNext = document.getElementById("carousel-next");
  var carouselCounter = document.getElementById("carousel-counter");

  function getVisibleCount() {
    if (!carouselGrid.firstElementChild) return 1;
    var cardW = carouselGrid.firstElementChild.offsetWidth + 20;
    return Math.max(1, Math.floor(carouselGrid.offsetWidth / cardW));
  }

  function updateCounter() {
    var cards = carouselGrid.children;
    if (!cards.length) { carouselCounter.textContent = ""; return; }
    var cardW = cards[0].offsetWidth + 20;
    var scrollIdx = Math.round(carouselGrid.scrollLeft / cardW);
    var visible = getVisibleCount();
    var first = scrollIdx + 1;
    var last = Math.min(scrollIdx + visible, cards.length);
    carouselCounter.textContent = first + "\u2013" + last + " of " + cards.length;
  }

  // --- Render projects ---
  function renderProjects(filter) {
    var grid = document.getElementById("projects-grid");
    var filtered = filter === "all" ? projects : projects.filter(function (p) { return p.category === filter; });

    var html = "";
    for (var i = 0; i < filtered.length; i++) {
      var p = filtered[i];
      var toolsHtml = "";
      for (var t = 0; t < p.tools.length; t++) {
        toolsHtml += '<span class="tool-tag">' + esc(p.tools[t]) + "</span>";
      }
      var winsHtml = "";
      for (var w = 0; w < p.wins.length; w++) {
        winsHtml += "<li>" + esc(p.wins[w]) + "</li>";
      }
      var quoteHtml = p.quote
        ? '<div class="project-quote">\u201C' + esc(p.quote) + '\u201D</div>'
        : "";

      html +=
        '<div class="project-card" data-category="' + esc(p.category) + '" data-id="' + p.id + '">' +
          '<div class="project-visual" style="background:' + p.visual.bg + '">' +
            '<div class="overlay">' +
              '<div class="vis-title">' + esc(p.visual.title) + "</div>" +
              '<div class="vis-detail">' + esc(p.visual.detail) + "</div>" +
              '<div class="vis-sub">' + esc(p.visual.sub) + "</div>" +
            "</div>" +
          "</div>" +
          '<div class="project-body">' +
            '<div class="project-meta">' +
              '<span class="category-badge ' + esc(p.category) + '">' + esc(p.category.replace(/-/g, " ")) + "</span>" +
              '<span class="project-author">' + esc(p.author) + "</span>" +
            "</div>" +
            '<div class="project-name">' + esc(p.name) + "</div>" +
            '<div class="project-summary">' + esc(p.summary) + "</div>" +
            '<div class="project-tools">' + toolsHtml + "</div>" +
            quoteHtml +
            '<div class="project-wins"><h4>What worked</h4><ul>' + winsHtml + "</ul></div>" +
            '<button class="vote-btn" data-vote="' + p.id + '">' +
              "Vote for this project " +
              '<span class="price">\u2014 $1 via Stripe Checkout</span>' +
            "</button>" +
          "</div>" +
        "</div>";
    }
    grid.innerHTML = html;
    // Reset scroll and update counter
    grid.scrollLeft = 0;
    updateCounter();
  }

  // --- Carousel navigation ---
  carouselPrev.addEventListener("click", function () {
    var cardW = (carouselGrid.firstElementChild || {}).offsetWidth || 380;
    carouselGrid.scrollBy({ left: -(cardW + 20) * getVisibleCount(), behavior: "smooth" });
  });

  carouselNext.addEventListener("click", function () {
    var cardW = (carouselGrid.firstElementChild || {}).offsetWidth || 380;
    carouselGrid.scrollBy({ left: (cardW + 20) * getVisibleCount(), behavior: "smooth" });
  });

  carouselGrid.addEventListener("scroll", updateCounter);

  // --- Render quotes ---
  function renderQuotes() {
    var grid = document.getElementById("quotes-grid");
    var html = "";
    for (var i = 0; i < highlights.length; i++) {
      var q = highlights[i];
      html +=
        '<div class="quote-card">' +
          '<div class="quote-text">\u201C' + esc(q.text) + '\u201D</div>' +
          '<div class="quote-attr">\u2014 ' + esc(q.author) + ", " + esc(q.project) + "</div>" +
        "</div>";
    }
    grid.innerHTML = html;
  }

  // --- Filter tabs ---
  document.getElementById("filter-tabs").addEventListener("click", function (e) {
    var tab = e.target.closest(".filter-tab");
    if (!tab) return;
    var tabs = document.querySelectorAll(".filter-tab");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
    tab.classList.add("active");
    renderProjects(tab.getAttribute("data-filter"));
  });

  // --- Vote button handler (Stripe Checkout) ---
  document.getElementById("projects-grid").addEventListener("click", function (e) {
    var btn = e.target.closest(".vote-btn");
    if (!btn) return;
    e.preventDefault();

    var projectId = parseInt(btn.getAttribute("data-vote"), 10);
    if (!projectId) return;

    // Disable button while loading
    btn.textContent = "Redirecting to Checkout\u2026";
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";

    fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: projectId })
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.alert("Error: " + (data.error || "Could not create checkout session"));
        btn.innerHTML = "Vote for this project <span class=\"price\">\u2014 $1 via Stripe Checkout</span>";
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    })
    .catch(function (err) {
      window.alert("Network error. Please try again.");
      btn.innerHTML = "Vote for this project <span class=\"price\">\u2014 $1 via Stripe Checkout</span>";
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    });
  });

  // --- Success banner after voting ---
  function checkVoteSuccess() {
    var params = new URLSearchParams(window.location.search);
    var votedId = params.get("voted");
    if (votedId && window.location.hash === "#success") {
      var project = projects.find(function (p) { return p.id === parseInt(votedId, 10); });
      if (project) {
        var banner = document.createElement("div");
        banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:999;background:#121212;color:#fff7f4;text-align:center;padding:16px;font-weight:400;font-size:13px;font-family:'SF Mono','Fira Mono','Roboto Mono',monospace;text-transform:uppercase;letter-spacing:1.5px;";
        banner.textContent = "Vote recorded for \"" + project.name + "\" \u2014 Thank you";
        document.body.appendChild(banner);
        setTimeout(function () { banner.style.transition = "opacity .5s"; banner.style.opacity = "0"; }, 4000);
        setTimeout(function () { banner.remove(); }, 4500);
        // Clean URL
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }

  // --- Init ---
  renderProjects("all");
  renderQuotes();
  checkVoteSuccess();

})();
