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
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAPoRDtd1AO71Jhec%2BB179DmRjVQDn%3D6O_gG9eXYybhFqnV3ETw%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 2, name: "Machine Payments Coffee Order", author: "Jennifer Lee",
      category: "customer-facing",
      summary: "Used Claude Code with a Privy wallet funded via Stripe onramp to order and pay for coffee through a food ordering AI agent using stablecoins over machine payments (x402).",
      tools: ["Claude Code", "Privy wallet", "Stripe Onramp", "Machine Payments (x402)"],
      wins: ["End-to-end agent-to-agent commerce flow actually worked", "Stablecoin funding via onramp was fast", "Real-world purchase completed autonomously"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CACTB1VF%2B5MemUxaM8iKkp0tSdxhxi5vRzYPkdqqQ5T6wXc_WFA%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 3, name: "Friction Point Aggregation Tool", author: "Alexandra Scolieri",
      category: "internal-tools",
      summary: "Built a Claude Code skill that parses feedback from friction log docs and Slack threads, extracts pain points, and populates a Google Sheet tracker for prioritizing Managed Payments improvements.",
      tools: ["Claude Code", "Claude Code Skills", "Google Sheets MCP", "Slack MCP"],
      wins: ["Parallel iteration with two Claude Code windows", "Reusable skill for ongoing use", "Converted plan to Google Doc for persistence"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAF8nL4pPF9wX4f2onHudsi3Eye1rH%2Bg2bummexPvdty7ch1XAA%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 4, name: "SOC2 Report Sharing SaaS", author: "Dan Stokeley",
      category: "customer-facing",
      summary: "Built a full SaaS app for sharing SOC2 reports via URL at $0.50/download, including marketing site, multi-tenant signup with Stripe UBB, magic link access, NDA gating, and admin dashboard.",
      tools: ["Claude Code"],
      wins: ["Full SaaS built in 2\u20133 hours", "Casual input worked \u2014 Claude discerned intent reliably", "Hot-reloading was sweet"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAMhVsNnS-7WcewzoD5r6T8A8%3DmP-10x%2BoMcP0ya3wbzSO-Xgfw%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 5, name: "Smart Contract Analysis", author: "Meghna Mehta",
      category: "data-analysis",
      summary: "Used Claude to parse Morpho\u2019s fee wrapper smart contract to understand party rights in the vault, preparing for a meeting to discuss Privy\u2019s Morpho lending protocol integration.",
      tools: ["Claude"],
      wins: ["Quickly understood complex smart contract code", "Better prepared for technical meeting"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CABMjNSJmjjTHQBej6dBsBxxY0KByerR6jPe9z1NpgShouUvqHg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 6, name: "BashBoard", author: "Narek Tamoyan",
      category: "internal-tools",
      summary: "Built a structured bug bash tool replacing Google Doc workflow: Chrome extension for real-time capture, AI-powered triage dashboard, and one-click Jira export.",
      tools: ["Cursor", "Claude"],
      wins: ["Chrome extension + dashboard + Jira integration built in one day", "Agent team approach (Cursor + Claude)"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CADCSE-boDUkLq_nPp1zE1TuFEmmvSMPPwOy4UsN%3DdmX3yb45dg%40mail.gmail.com",
      demo_url: "https://screen.studio/share/g4w2BmXZ",
    },
    {
      id: 7, name: "AI-Optimized PM Workflows", author: "Josh Ackerman",
      category: "automation",
      summary: "Multiple AI workflow optimizations: Claude Code for Hubble queries (5\u201310 agents in parallel), go/chat for answering PSO questions, meeting note summaries, SOKR updates, NotebookLM for user feedback.",
      tools: ["Claude Code", "go/chat", "NotebookLM", "KCM Review Agent", "Hubble MCP"],
      wins: ["5\u201310 parallel Claude Code agents for queries", "Text expander + go/chat for meeting summaries", "NotebookLM for user feedback synthesis"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CACJjim7TYDtvaZmeBk3_T4jh-kqbbwTuW5gGXhgeVdsyGyqd8g%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 8, name: "Radar for Platforms Sales Support", author: "Alisa Noll",
      category: "internal-tools",
      summary: "Built three sales tools: an agent developing pitch/pricing/ROI for Connect platforms, an alert agent that Slacks when platforms have risky accounts, and a fraud attack dashboard from support tickets.",
      tools: ["Claude Code", "Slack MCP"],
      wins: ["Three distinct tools built in one day", "Direct sales pipeline applications"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CADWFUuor6k7g2hBSAD6-nBzxq4n6bDTzvMZXaKadHVm0OyM%3D_g%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 9, name: "Easy Point of Sale", author: "Kate Brennan",
      category: "customer-facing",
      summary: "Built a web-based POS accepting in-person payments with Stripe Terminal (including unreleased Reader T600) in ~90 minutes using Replit and Claude Code.",
      tools: ["Replit", "Claude Code", "Stripe Terminal", "Gemini"],
      wins: ["Built in ~90 minutes", "Claimable sandboxes for seamless Replit integration", "Demonstrates empathy with user jobs-to-be-done"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CA%2B9O0opVC7WTAERP-rzm9cEFJmtfKDh6kJdBHwa7Fyyc7hHo%2Bg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 10, name: "Soura \u2014 Relationship Health Check", author: "Jennifer Lee",
      category: "internal-tools",
      summary: "Built a personal analytics tool that scans Slack DMs and Google Calendar to surface relationship health insights with a Soura Score (0\u2013100), per-conversation breakdowns, anomaly flags, and PM mode.",
      tools: ["Claude Code", "Slack API", "Google Calendar API"],
      wins: ["Iterative sculpting workflow felt natural", "Background processing solved rate limiting", "Metrics-first, privacy-minded design"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CACTB1VE8SeiysBo8z1Z3XgNZa42bcbc1%2BFDWGaQRbJyFLT701w%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 11, name: "VAT ID Pattern Validation", author: "Rutvij Oza",
      category: "customer-facing",
      summary: "Modified production code to detect suspicious VAT ID patterns (repetitions, sequences, repeating patterns) on checkout before hitting verification APIs. 17 passing tests.",
      tools: ["Claude Code"],
      wins: ["Asking \u2018why\u2019 questions saved days of work", "Simple frontend approach beat complex devbox orchestration", "300 lines of TypeScript with 17 tests"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAPo-bELygxT5OsyXBJ2UuK16PNQ_R4-nJ7AQDZAMMFT1zG0p_g%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 12, name: "VAT/GST Registration Advisor", author: "Aleksandra Bal",
      category: "customer-facing",
      summary: "Built a web app helping merchants determine VAT/GST registration obligations via questionnaire. Covers EU, UK, Australia with 48 jurisdiction-specific rules.",
      tools: ["Claude Code"],
      wins: ["Thorough planning (4h) made build phase fast (2h)", "Tax specialist domain expertise ensured accurate rules", "Simple tech stack (Flask, TSV flat file for rules)"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAGQc%3Dc%3Dg7DkYB1_dMXzMpkzA4hDJ2YzDFs33XRGjvSbePi91_g%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 13, name: "RISA Compliance Survey Refresh", author: "Daniel Heffernan",
      category: "automation",
      summary: "Multi-week production project: removed 4 of 5 redundant RISA compliance questions from Japanese merchant onboarding. 8 PRs across backend, frontend, partner pipelines, and synthetics.",
      tools: ["Claude (Cursor)", "Claude Code"],
      wins: ["Speed on mechanical work \u2014 hours reduced to minutes", "Human review caught a real pre-existing stale data bug", "Iterative collaboration \u2014 Claude adapted when pushed back"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAPbYO71xDchznVHByRMLbvKKFdWs2aNMJvXbGQNtrdx1Qq1eAA%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 14, name: "Stripe Japan X Monitor", author: "Daniel Heffernan",
      category: "internal-tools",
      summary: "Built an LLM-powered RSS feed monitoring Japanese X posts about Stripe, filtering spam via GPT-4o-mini on val.town, posting to Slack. $0/month to operate.",
      tools: ["Claude Code", "val.town", "RSS.app", "GPT-4o-mini", "Superwhisper"],
      wins: ["Rapid exploration of 3 solution spaces in one day", "Discovery through AI \u2014 found val.town built-in OpenAI access", "$0/month on free tiers"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAPbYO71g8vjawehHPQ069ZF7KNy0jmB4%2Bz60XZ_xbwfPGJ4TJg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 15, name: "Shelf Help Books", author: "Gary Pelissier",
      category: "customer-facing",
      summary: "Built a live e-commerce bookstore (shelfhelpbooks.shop) using only AI tools to dogfood Stripe\u2019s Local Payment Methods, Dynamic Payment Methods, and Checkout optimization. Full storefront assembled in 35 minutes.",
      tools: ["Lovable", "ChatGPT", "Stripe Checkout", "Dynamic Payment Methods"],
      wins: ["Fully functional live storefront in under 35 minutes", "Tested Dynamic Payment Methods including Affirm threshold logic", "Exposed real UX pain point: Stripe approval took longer than the entire build"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAF4tLH7RhKtVsaNSrktG4wgOVEAHBmvhfcaVZt7%3D0XKjYbOemw%40mail.gmail.com",
      demo_url: "https://shelfhelpbooks.shop",
    },
    {
      id: 16, name: "Terminal Dashboard Onboarding Prototype", author: "Denise Young",
      category: "internal-tools",
      summary: "Rapidly prototyped a new dynamic, user-intent-aware Terminal Dashboard Onboarding flow using Protodash, replacing the current static setup with one that adapts based on integration path.",
      tools: ["Protodash", "Claude Code"],
      wins: ["Full interactive onboarding prototype in under a day", "Protodash enforced Sail design language automatically", "Used Claude Code to locate Fox component source code for pixel-perfect recreation"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CACPjgsxhxRxP-TkpZTCct1XVA1knMKrJvGx1jPuz3H%3DX5DPwig%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 17, name: "Refund Friction Analyst", author: "Vighnesh Kumar Pathak",
      category: "internal-tools",
      summary: "Built two tools: a Protodash prototype surfacing L2/L3 missing/poor data quality in the Stripe dashboard, and an agent that tracks refund-related Slack DMs and builds a priority backlog from Jiras.",
      tools: ["Protodash", "Agent Builder (FinLLM)"],
      wins: ["Agent Builder easier to use than expected", "Protodash auto-implements in Stripe design style", "Dedicated AI-cation day reduced barrier to tool adoption"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CANH7e0NwK3aexhztLr9hsgqTnt70dWuzKv4g9GbbEcavrCHKxg%40mail.gmail.com",
      demo_url: "https://admin.corp.stripe.com/finllm/dynamic?name=Refund%20Friction%20Analyst&version=0.04",
    },
    {
      id: 18, name: "3DS Product Suite", author: "Cip Blujdea",
      category: "automation",
      summary: "Built three things in one day: a GTM dashboard in Hubble for Authentication metrics, an improved Claude Code \u201CPM brain extension,\u201D and a FinLLM agent that answers 3D Secure questions and writes RFPs.",
      tools: ["Hubble", "Claude Code", "Agent Builder (FinLLM)"],
      wins: ["FinLLM agent auto-generates RFPs about 3D Secure", "Built a GTM dashboard for real-time product metrics", "Improved personal Claude Code PM brain system"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CABG%3DULoZ2Sw5GZbOmkeR5XTKsWQKYa0H1sGfq8YnD_NSCxDk0Q%40mail.gmail.com",
      demo_url: "https://admin.corp.stripe.com/finllm/agent/Standalone%203DS%20expert",
    },
    {
      id: 19, name: "AI-cation Multi-Project", author: "Daniel Loke",
      category: "customer-facing",
      summary: "Built five experiments: an automated stand-up rotator, a \u201CBYO-LLM Stripe Data Assistant\u201D that lets merchants chat with their data (bypassing Sigma), a Lovable storefront with ACP, and Figma-to-code prototypes.",
      tools: ["Claude Code", "Lovable", "Stripe ACP", "Anthropic API", "Figma MCP", "Stripe Pages"],
      wins: ["Built a Stripe Data Assistant that poses a real question for Sigma", "Lovable one-shot the Stripe ACP integration from a single prompt", "Identified strategic insight: ACP growth is merchant-constrained"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAP6cNSaAP4CkPpV1BOYyzJajjGeESgbc7BVWnc-pb4jUCXiLVg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 20, name: "Trial Email Bug Fix", author: "Oliver W.",
      category: "customer-facing",
      summary: "Closed a real customer escalation by fixing a trial email bug end-to-end using Claude Code \u2014 from escalation to merged PR in days, learning Stripe\u2019s architecture faster than any doc review.",
      tools: ["Claude Code"],
      wins: ["Resolved real customer escalation with merged PR", "Learned architecture faster than doc review", "Demonstrated PM-to-production pipeline"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 21, name: "Capital Weekly Periods Admin Fix", author: "Cecelia Shao",
      category: "internal-tools",
      summary: "Shipped 2 PRs to make Capital weekly periods render legibly on the admin page, after 6 session compressions and two late nights. Next: backend math for multi-period deferrals.",
      tools: ["Claude Code"],
      wins: ["Shipped 2 production PRs to admin page", "Persisted through 6 context compressions", "Unlocked multi-period deferral work"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 22, name: "Org-level Blueprints in Workbench", author: "David Wood",
      category: "customer-facing",
      summary: "Built a live fullstack demo of org-level Blueprints in Workbench for the Customer and Payment Method Sharing GA, including a new getting-started flow directing users to test sharing in a sandbox org.",
      tools: ["Claude Code"],
      wins: ["Live fullstack demo deployed end-to-end", "New getting-started flow for sandbox orgs", "Tooling enabled tackling a bigger project than expected"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAGJaAQxDwpJKGdz6_YRpkMzGWxYhhQQPmRZrJvQR-aDQR2OD%2Bg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 23, name: "Daily Meeting Brief Skill", author: "Jaeel",
      category: "automation",
      summary: "Built a /today-meetings Claude Code skill that pulls calendar events, scans public Slack channels, Google Drive, and Gmail for context, then sends a comprehensive day overview via Slack DM.",
      tools: ["Claude Code", "Toolshed OAuth", "Slack MCP", "Google Calendar", "Gmail"],
      wins: ["One command generates full daily briefing", "Cross-references multiple data sources for meeting context", "Actionable talking points per meeting"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 24, name: "Connect Distribution Trends Agent", author: "David Yang",
      category: "data-analysis",
      summary: "Created a go/chat agent that analyzes Connect product distribution trends across six P0 products (Adaptive Pricing, LPMs, Capital, Billing, Instant Payouts, Terminal), outputs Google Docs, and plans to automate the MBR deck.",
      tools: ["go/chat Agent", "Hubble", "Google Docs MCP"],
      wins: ["Instant ONR trend analysis across 6 P0 products", "Auto-generates formatted Google Doc reports", "Roadmap to fully automate MBR deck creation"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 25, name: "Money Management Mobile App", author: "Lola",
      category: "customer-facing",
      summary: "Built a rough prototype of a money management-only mobile app using Claude, deployed on Vercel. Left the experience feeling energized about what\u2019s possible.",
      tools: ["Claude", "Vercel"],
      wins: ["Functional mobile prototype deployed to Vercel", "Learned a lot through hands-on building", "Demonstrated mobile-first financial app concept"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 26, name: "Instant Payouts Element Prototype", author: "Ha Lee",
      category: "customer-facing",
      summary: "Demoed a new Stripe Element for Instant Payouts that owns all eligibility checking, risk evaluation, UI, fee calculation, and payout submission \u2014 letting platforms enable IP in ~15 lines of code.",
      tools: ["Claude Code"],
      wins: ["Reduced Instant Payouts integration to ~15 lines of code", "Element owns eligibility, risk, fees, and submission", "Addresses 5% of Terminal lost deals due to engineering resource constraints"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 27, name: "Connect Traits Explorer", author: "Ivan Ribeiro",
      category: "internal-tools",
      summary: "Built an internal Stripe Page (pages.stripe.me/trait-or-dare) to interactively explore Connect\u2019s configuration properties, which can be rough to navigate in documentation.",
      tools: ["Claude Code", "Stripe Pages"],
      wins: ["Live internal tool at pages.stripe.me/trait-or-dare", "Makes Connect traits navigable and explorable", "Fun UX for a traditionally dry config space"],
      writeup_url: null,
      demo_url: "https://pages.stripe.me/trait-or-dare",
    },
    {
      id: 28, name: "Fund Flow Agent", author: "Hernan Herrera",
      category: "internal-tools",
      summary: "Built an agent that runs account assessments based on acct_ids and Hubble queries, generating detailed status reports. Includes a guide for use on devbox or local machine, with plans for a simplified CC plugin version.",
      tools: ["Claude Code", "Hubble"],
      wins: ["Automated account health assessment from acct_ids", "Works on devbox or local machine", "Generates detailed Google Doc reports per account"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 29, name: "Partner Reporting Platform Fix", author: "RK",
      category: "internal-tools",
      summary: "Used a Minion to write, test, and merge a PR on the Partner Reporting Platform \u2014 adding description display when selecting submission evidence categories to reduce user confusion.",
      tools: ["Minion"],
      wins: ["First merged PR using AI tooling", "Resolved real user confusion on PRP", "Ramped up on eng workflows (repos, devboxes, PRs) in the process"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 30, name: "Product Changelog & Slack App", author: "Miles M.",
      category: "internal-tools",
      summary: "Built an updated product changelog and Slack app to increase user awareness of what Stripe ships. Addresses the gap in internal visibility of shipped features.",
      tools: ["Claude Code"],
      wins: ["Functional Slack app for shipping awareness", "Addresses real internal communication gap", "Built during PM-aication onsite sprint"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 31, name: "Enterprise Cost Management Prototype", author: "Paul Meagher",
      category: "customer-facing",
      summary: "Prototyped an org-level cost management experience for Enterprise users using a remote devbox with prod backend and Claude Code, making the design feel more Stripe-native than earlier v0 prototypes.",
      tools: ["Claude Code", "Remote Devbox"],
      wins: ["Stripe-native design vs earlier v0 prototypes", "Used prod backend for realistic prototyping", "Rapid iteration on Enterprise UX"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 32, name: "Projects Built with Claude Code", author: "Alan Tam",
      category: "automation",
      summary: "Built multiple projects using Claude Code during PM-aication week, documenting the full experience and workflows in a detailed writeup.",
      tools: ["Claude Code"],
      wins: ["Multiple projects completed during AI-cation", "Documented end-to-end Claude Code workflows"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAKN5TBQKtFTZiiQpZ9zQGAuhqPAC7HVEmGxyryX%2B5SSW%3D%3D0iog%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 33, name: "GTM Insights AI Workflows", author: "Akshay Bhalla",
      category: "automation",
      summary: "Applied AI tools to GTM Insights workflows during PM-aication week, finding that the week was a valuable reminder to pause, learn, and apply AI to daily work.",
      tools: ["Claude Code"],
      wins: ["Practical AI integration into GTM workflows", "Learning-focused approach to AI adoption"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAAP%2BsOu5uJP9msDByX5zfHPYZ%2B-zCMFk8n4BEhMi8pMq%3D2RHuQ%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 34, name: "Sail Classic to Sail Next Migration", author: "Connor Rowland",
      category: "internal-tools",
      summary: "Used Claude Code to migrate Dashboard code from Sail Classic to Sail Next, including Claude-assisted QA. Documented setup friction, migration process, and shipped a real PR.",
      tools: ["Claude Code"],
      wins: ["Shipped a real pay-server PR from AI-cation", "Claude-assisted QA for code migration", "Documented friction points for tooling improvement"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAO4Gadw0igqcqrjDCBySt4_MESnRPFk%3D6s6%2BZkszamMVDA7uZA%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 35, name: "AI Documentation & Feature Flags", author: "Kelly Moriarty",
      category: "automation",
      summary: "Explored AI for documentation writing (huge speedup), feature flag management (mixed results), and learned that ROI math isn\u2019t always obvious \u2014 the learning curve tension between new tools and existing workflows is real.",
      tools: ["Claude Code"],
      wins: ["Documentation reduced from hours to ~15 minutes", "Honest assessment of AI limitations", "Identified voice/tone gap in AI-generated content"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAHwUF5YrSLqMvKp0LaeVKqDGtBTiab7FRQ5qjifQq_nk%2B%2BZ5Vg%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 36, name: "Vault & Forward Wallet Docs", author: "Maria Yang",
      category: "customer-facing",
      summary: "Used Claude Code to update public documentation for Stripe\u2019s new Vault and Forward wallet support features, turning AI into a docs authoring accelerator.",
      tools: ["Claude Code"],
      wins: ["Updated public-facing docs with AI assistance", "Practical docs workflow for new features"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/autogen-java-9f845cae-01d1-41fd-b3f2-ec769c0fac27%40google.com",
      demo_url: null,
    },
    {
      id: 37, name: "EU Crypto Onramp PRD", author: "Patrick Kelly",
      category: "customer-facing",
      summary: "Had Claude Code research the EU regulatory environment for crypto onramps, document requirements, and build a full PRD for expanding Stripe\u2019s crypto onramp product to the EU \u2014 consolidating 2 weeks of work into hours.",
      tools: ["Claude Code"],
      wins: ["2 weeks of work consolidated into hours", "Claude Code far more powerful than vanilla go/chat", "Full PRD built without writing any text manually"],
      writeup_url: "https://groups.google.com/a/stripe.com/d/msgid/pm-aication-notes/CAA6K35jp90kpfNs7bDhmxqi8STLW2dDhmG2O83toszRqEU1%3DoA%40mail.gmail.com",
      demo_url: null,
    },
    {
      id: 38, name: "Bank Debits Walking the Store", author: "Brendan Meehan",
      category: "data-analysis",
      summary: "Four projects: deployed first code change from walking the store, built monthly financial analysis on bank debits payment methods diagnosing PIV/ONR changes, found users in core segments to co-create with, and attempted customer support ticket insights.",
      tools: ["Claude Code", "Hubble"],
      wins: ["Deployed first code change ever", "Strong financial analysis for diagnosing PIV/ONR changes", "Found core segment users for co-creation"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 39, name: "LPM Documentation at Scale", author: "Julius Danek",
      category: "customer-facing",
      summary: "Updated ~75 LPM documentation pages and created QoL improvements using Claude Code with Minions. First production PR shipped, fixing business location naming and adding direct linking across payment method docs.",
      tools: ["Claude Code", "Minions"],
      wins: ["~75 documentation pages updated", "First production PR shipped", "Built a Stripe Page to document the work"],
      writeup_url: null,
      demo_url: "https://pages.stripe.me/jdanek-lpm-documentation",
    },
    {
      id: 40, name: "Canvas and Soul Art Auction", author: "Akhil Sadarangani",
      category: "customer-facing",
      summary: "Built Canvas and Soul, a personal auction storefront for original paintings with 20% commitment deposits via Stripe Checkout and Connect, plus email confirmations via Resend. Also built a metrics dip alert agent.",
      tools: ["Claude Code", "Stripe Checkout", "Stripe Connect", "Resend"],
      wins: ["Live auction site at canvasandsoul.art", "Navigated Connect configuration for API keys", "Built metrics dip alert as bonus project"],
      writeup_url: null,
      demo_url: "https://www.canvasandsoul.art/",
    },
    {
      id: 41, name: "Pipeline Studio Product Analysis", author: "Skye Bacus",
      category: "data-analysis",
      summary: "Used Claude to analyze data and build multiple datasets in Pipeline Studio to understand product creation and edit behavior, powering a Hubble dashboard for ongoing product insights.",
      tools: ["Claude", "Pipeline Studio", "Hubble"],
      wins: ["Multiple datasets built for product behavior analysis", "Powered ongoing Hubble dashboard"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 42, name: "Enterprise User Needs Prioritization", author: "Mayur Dewaikar",
      category: "data-analysis",
      summary: "Used Claude Code to generate a prioritized list of unmet Enterprise user needs, producing a comprehensive analysis document that consolidated research that would have taken much longer manually.",
      tools: ["Claude Code"],
      wins: ["Comprehensive Enterprise needs prioritization", "High-quality output from first Claude Code project"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 43, name: "Fintech GTM Plan Generator", author: "Nick Krakoff",
      category: "automation",
      summary: "Used Claude Code to create a detailed GTM plan for fintechs: 500 potential users across AMER, UK, EU, and APAC with individual GTM plans for each \u2014 compressing weeks of work into minutes.",
      tools: ["Claude Code"],
      wins: ["500 potential users identified with GTM plans", "Weeks of work compressed into minutes", "Cross-region coverage (AMER, UK, EU, APAC)"],
      writeup_url: null,
      demo_url: null,
    },
    {
      id: 44, name: "Dante Managed Payments Docs Review", author: "Ahmed Gharib",
      category: "internal-tools",
      summary: "Used Dante to review Managed Payments documentation, surfacing both expected and unexpected feedback on docs quality, accuracy, and completeness.",
      tools: ["Dante"],
      wins: ["Surfaced unexpected feedback on docs", "Quick audit of Managed Payments documentation"],
      writeup_url: null,
      demo_url: null,
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

  // --- Pagination ---
  var ITEMS_PER_PAGE = 24;
  var currentPage = 1;
  var currentFilter = "all";

  // --- Render projects ---
  function getFilteredProjects(filter) {
    return filter === "all" ? projects : projects.filter(function (p) { return p.category === filter; });
  }

  function renderProjects(filter, page) {
    if (filter !== undefined) currentFilter = filter;
    if (page !== undefined) currentPage = page;

    var grid = document.getElementById("projects-grid");
    var filtered = getFilteredProjects(currentFilter).slice().sort(function (a, b) {
      var aDemo = a.demo_url ? 0 : 1;
      var bDemo = b.demo_url ? 0 : 1;
      return aDemo - bDemo;
    });
    var totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    var start = (currentPage - 1) * ITEMS_PER_PAGE;
    var pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    var html = "";
    for (var i = 0; i < pageItems.length; i++) {
      var p = pageItems[i];
      var toolsHtml = "";
      for (var t = 0; t < p.tools.length; t++) {
        toolsHtml += '<span class="tool-tag">' + esc(p.tools[t]) + "</span>";
      }
      var winsHtml = "";
      for (var w = 0; w < p.wins.length; w++) {
        winsHtml += "<li>" + esc(p.wins[w]) + "</li>";
      }

      var linksHtml = "";
      if (p.writeup_url || p.demo_url) {
        linksHtml = '<div class="project-links">';
        if (p.writeup_url) {
          linksHtml += '<a href="' + esc(p.writeup_url) + '" class="project-link" target="_blank" rel="noopener">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h8v12H4z" stroke="currentColor" stroke-width="1.5"/><path d="M6 5h4M6 7.5h4M6 10h2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' +
            ' Writeup</a>';
        }
        if (p.demo_url) {
          linksHtml += '<a href="' + esc(p.demo_url) + '" class="project-link demo-link" target="_blank" rel="noopener">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l6 4-6 4V4z" fill="currentColor"/></svg>' +
            ' Demo</a>';
        }
        linksHtml += "</div>";
      }

      html +=
        '<div class="project-card" data-category="' + esc(p.category) + '" data-id="' + p.id + '">' +
          '<div class="project-body">' +
            '<div class="project-meta">' +
              '<span class="category-badge ' + esc(p.category) + '">' + esc(p.category.replace(/-/g, " ")) + "</span>" +
            "</div>" +
            '<div class="project-name">' + (p.writeup_url ? '<a href="' + esc(p.writeup_url) + '" target="_blank" rel="noopener">' + esc(p.name) + '</a>' : esc(p.name)) + "</div>" +
            '<div class="project-author">' + esc(p.author) + "</div>" +
            '<div class="project-summary">' + esc(p.summary) + "</div>" +
            '<div class="project-tools">' + toolsHtml + "</div>" +
            '<div class="project-wins"><h4>What worked</h4><ul>' + winsHtml + "</ul></div>" +
            linksHtml +
            '<button class="vote-btn" data-vote="' + p.id + '">' +
              "Vote $1" +
            "</button>" +
          "</div>" +
        "</div>";
    }
    grid.innerHTML = html;
    renderPagination(filtered.length, totalPages);
  }

  function renderPagination(totalItems, totalPages) {
    var pag = document.getElementById("pagination");
    if (totalPages <= 1) { pag.innerHTML = ""; return; }

    var html = '<button class="page-btn" data-page="prev" ' + (currentPage <= 1 ? "disabled" : "") + '>&larr;</button>';

    for (var i = 1; i <= totalPages; i++) {
      html += '<button class="page-btn' + (i === currentPage ? " active" : "") + '" data-page="' + i + '">' + i + "</button>";
    }

    html += '<button class="page-btn" data-page="next" ' + (currentPage >= totalPages ? "disabled" : "") + '>&rarr;</button>';
    html += '<span class="page-info">' + totalItems + " projects</span>";
    pag.innerHTML = html;
  }

  // --- Pagination clicks ---
  document.getElementById("pagination").addEventListener("click", function (e) {
    var btn = e.target.closest(".page-btn");
    if (!btn || btn.disabled) return;
    var val = btn.getAttribute("data-page");
    if (val === "prev") renderProjects(undefined, currentPage - 1);
    else if (val === "next") renderProjects(undefined, currentPage + 1);
    else renderProjects(undefined, parseInt(val, 10));
    // Scroll to top of projects section
    var el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // --- Render quotes with auto-scroll ---
  var quoteAutoScroll = null;

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
    startQuoteAutoScroll();
  }

  function startQuoteAutoScroll() {
    var track = document.getElementById("quotes-grid");
    if (!track) return;
    if (quoteAutoScroll) clearInterval(quoteAutoScroll);

    quoteAutoScroll = setInterval(function () {
      var card = track.querySelector(".quote-card");
      if (!card) return;
      var step = card.offsetWidth + 16; // card width + gap
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 2) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += step;
      }
    }, 4000);

    track.addEventListener("mouseenter", function () {
      if (quoteAutoScroll) clearInterval(quoteAutoScroll);
    });
    track.addEventListener("mouseleave", function () {
      startQuoteAutoScroll();
    });
  }

  // --- Filter tabs ---
  document.getElementById("filter-tabs").addEventListener("click", function (e) {
    var tab = e.target.closest(".filter-tab");
    if (!tab) return;
    var tabs = document.querySelectorAll(".filter-tab");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
    tab.classList.add("active");
    renderProjects(tab.getAttribute("data-filter"), 1);
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
        btn.textContent = "Vote $1";
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    })
    .catch(function (err) {
      window.alert("Network error. Please try again.");
      btn.textContent = "Vote $1";
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
  renderProjects("all", 1);
  renderQuotes();
  checkVoteSuccess();

})();
