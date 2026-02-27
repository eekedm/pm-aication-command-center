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
      visual: { bg: "linear-gradient(135deg, #1a1040, #2d1b69)", title: "Fleet model", detail: "34 sessions", sub: "9 skills shipped in one sprint" },
    },
    {
      id: 2, name: "Machine Payments Coffee Order", author: "Jennifer Lee",
      category: "customer-facing",
      summary: "Used Claude Code with a Privy wallet funded via Stripe onramp to order and pay for coffee through a food ordering AI agent using stablecoins over machine payments (x402).",
      tools: ["Claude Code", "Privy wallet", "Stripe Onramp", "Machine Payments (x402)"],
      wins: ["End-to-end agent-to-agent commerce flow actually worked", "Stablecoin funding via onramp was fast", "Real-world purchase completed autonomously"],
      quote: "I just bought myself coffee today using Claude Code!!",
      visual: { bg: "linear-gradient(135deg, #1a3020, #0d4a2a)", title: "Agent commerce", detail: "Coffee via x402", sub: "Agent-to-agent stablecoin payment" },
    },
    {
      id: 3, name: "Friction Point Aggregation Tool", author: "Alexandra Scolieri",
      category: "internal-tools",
      summary: "Built a Claude Code skill that parses feedback from friction log docs and Slack threads, extracts pain points, and populates a Google Sheet tracker for prioritizing Managed Payments improvements.",
      tools: ["Claude Code", "Claude Code Skills", "Google Sheets MCP", "Slack MCP"],
      wins: ["Parallel iteration with two Claude Code windows", "Reusable skill for ongoing use", "Converted plan to Google Doc for persistence"],
      quote: "Getting access to the right tools was my biggest hurdle.",
      visual: { bg: "linear-gradient(135deg, #1a1a40, #2b1560)", title: "Feedback synthesis", detail: "Slack + Docs", sub: "Auto-extracts pain points to sheets" },
    },
    {
      id: 4, name: "SOC2 Report Sharing SaaS", author: "Dan Stokeley",
      category: "customer-facing",
      summary: "Built a full SaaS app for sharing SOC2 reports via URL at $0.50/download, including marketing site, multi-tenant signup with Stripe UBB, magic link access, NDA gating, and admin dashboard.",
      tools: ["Claude Code"],
      wins: ["Full SaaS built in 2\u20133 hours", "Casual input worked \u2014 Claude discerned intent reliably", "Hot-reloading was sweet"],
      quote: "Just generally the whole \u2018build me an app that could be a neat small business in 2\u20133 hours, where what I do mostly consists of entering Yes repeatedly\u2019.",
      visual: { bg: "linear-gradient(135deg, #2a1a10, #4a2a0a)", title: "Full SaaS", detail: "2\u20133 hours", sub: "Marketing + auth + billing + admin" },
    },
    {
      id: 5, name: "Smart Contract Analysis", author: "Meghna Mehta",
      category: "data-analysis",
      summary: "Used Claude to parse Morpho\u2019s fee wrapper smart contract to understand party rights in the vault, preparing for a meeting to discuss Privy\u2019s Morpho lending protocol integration.",
      tools: ["Claude"],
      wins: ["Quickly understood complex smart contract code", "Better prepared for technical meeting"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #0a1a3a, #0a2a5a)", title: "Contract parsing", detail: "Morpho vault", sub: "Smart contract rights analysis" },
    },
    {
      id: 6, name: "BashBoard", author: "Narek Tamoyan",
      category: "internal-tools",
      summary: "Built a structured bug bash tool replacing Google Doc workflow: Chrome extension for real-time capture, AI-powered triage dashboard, and one-click Jira export.",
      tools: ["Cursor", "Claude"],
      wins: ["Chrome extension + dashboard + Jira integration built in one day", "Agent team approach (Cursor + Claude)"],
      quote: "It replaces the Google Doc bug bash workflow with a structured end-to-end tool.",
      visual: { bg: "linear-gradient(135deg, #1a2030, #1a3050)", title: "Bug bash 2.0", detail: "3 components", sub: "Extension + dashboard + Jira export" },
    },
    {
      id: 7, name: "AI-Optimized PM Workflows", author: "Josh Ackerman",
      category: "automation",
      summary: "Multiple AI workflow optimizations: Claude Code for Hubble queries (5\u201310 agents in parallel), go/chat for answering PSO questions, meeting note summaries, SOKR updates, NotebookLM for user feedback.",
      tools: ["Claude Code", "go/chat", "NotebookLM", "KCM Review Agent", "Hubble MCP"],
      wins: ["5\u201310 parallel Claude Code agents for queries", "Text expander + go/chat for meeting summaries", "NotebookLM for user feedback synthesis"],
      quote: "Wait a second, am I now the prompt-er or am I being prompt-ed? Who is the agent here?!",
      visual: { bg: "linear-gradient(135deg, #2a2010, #3a3010)", title: "Parallel agents", detail: "5\u201310 at once", sub: "Hubble, meetings, SOKRs, feedback" },
    },
    {
      id: 8, name: "Radar for Platforms Sales Support", author: "Alisa Noll",
      category: "internal-tools",
      summary: "Built three sales tools: an agent developing pitch/pricing/ROI for Connect platforms, an alert agent that Slacks when platforms have risky accounts, and a fraud attack dashboard from support tickets.",
      tools: ["Claude Code", "Slack MCP"],
      wins: ["Three distinct tools built in one day", "Direct sales pipeline applications"],
      quote: null,
      visual: { bg: "linear-gradient(135deg, #2a0a1a, #4a0a2a)", title: "Sales toolkit", detail: "3 tools", sub: "Pitch agent + alerts + fraud dashboard" },
    },
    {
      id: 9, name: "Easy Point of Sale", author: "Kate Brennan",
      category: "customer-facing",
      summary: "Built a web-based POS accepting in-person payments with Stripe Terminal (including unreleased Reader T600) in ~90 minutes using Replit and Claude Code.",
      tools: ["Replit", "Claude Code", "Stripe Terminal", "Gemini"],
      wins: ["Built in ~90 minutes", "Claimable sandboxes for seamless Replit integration", "Demonstrates empathy with user jobs-to-be-done"],
      quote: "Nearly 5% of Terminal lost deals are due to \u2018not enough engineering resources to build a custom point of sale\u2019. Let\u2019s equip our future users to build faster.",
      visual: { bg: "linear-gradient(135deg, #0a2a1a, #0a4a2a)", title: "POS prototype", detail: "90 minutes", sub: "Terminal T600 + web POS" },
    },
    {
      id: 10, name: "Soura \u2014 Relationship Health Check", author: "Jennifer Lee",
      category: "internal-tools",
      summary: "Built a personal analytics tool that scans Slack DMs and Google Calendar to surface relationship health insights with a Soura Score (0\u2013100), per-conversation breakdowns, anomaly flags, and PM mode.",
      tools: ["Claude Code", "Slack API", "Google Calendar API"],
      wins: ["Iterative sculpting workflow felt natural", "Background processing solved rate limiting", "Metrics-first, privacy-minded design"],
      quote: "It felt like sculpting: \u2018more like this, less like that\u2019 until it clicked.",
      visual: { bg: "linear-gradient(135deg, #1a0a30, #3a0a50)", title: "Soura Score", detail: "0\u2013100", sub: "DM + calendar relationship analytics" },
    },
    {
      id: 11, name: "VAT ID Pattern Validation", author: "Rutvij Oza",
      category: "customer-facing",
      summary: "Modified production code to detect suspicious VAT ID patterns (repetitions, sequences, repeating patterns) on checkout before hitting verification APIs. 17 passing tests.",
      tools: ["Claude Code"],
      wins: ["Asking \u2018why\u2019 questions saved days of work", "Simple frontend approach beat complex devbox orchestration", "300 lines of TypeScript with 17 tests"],
      quote: "Architecture > code speed: The backend implementation was technically correct but architecturally wrong. AI writes code fast, but you need to guide the approach.",
      visual: { bg: "linear-gradient(135deg, #0a1a2a, #1a2a3a)", title: "Production code", detail: "17 tests", sub: "VAT fraud pattern detection" },
    },
    {
      id: 12, name: "VAT/GST Registration Advisor", author: "Aleksandra Bal",
      category: "customer-facing",
      summary: "Built a web app helping merchants determine VAT/GST registration obligations via questionnaire. Covers EU, UK, Australia with 48 jurisdiction-specific rules.",
      tools: ["Claude Code"],
      wins: ["Thorough planning (4h) made build phase fast (2h)", "Tax specialist domain expertise ensured accurate rules", "Simple tech stack (Flask, TSV flat file for rules)"],
      quote: "A key takeaway: thorough upfront planning makes the build phase significantly easier.",
      visual: { bg: "linear-gradient(135deg, #1a2a1a, #2a3a1a)", title: "Tax advisor", detail: "48 rules", sub: "EU, UK, Australia jurisdictions" },
    },
    {
      id: 13, name: "RISA Compliance Survey Refresh", author: "Daniel Heffernan",
      category: "automation",
      summary: "Multi-week production project: removed 4 of 5 redundant RISA compliance questions from Japanese merchant onboarding. 8 PRs across backend, frontend, partner pipelines, and synthetics.",
      tools: ["Claude (Cursor)", "Claude Code"],
      wins: ["Speed on mechanical work \u2014 hours reduced to minutes", "Human review caught a real pre-existing stale data bug", "Iterative collaboration \u2014 Claude adapted when pushed back"],
      quote: "I treated Cursor w/ Claude as a smart engineer and acted as the EM, and it solved it.",
      visual: { bg: "linear-gradient(135deg, #2a1a0a, #3a2a0a)", title: "Production PRs", detail: "8 PRs merged", sub: "Backend + frontend + partner pipelines" },
    },
    {
      id: 14, name: "Stripe Japan X Monitor", author: "Daniel Heffernan",
      category: "internal-tools",
      summary: "Built an LLM-powered RSS feed monitoring Japanese X posts about Stripe, filtering spam via GPT-4o-mini on val.town, posting to Slack. $0/month to operate.",
      tools: ["Claude Code", "val.town", "RSS.app", "GPT-4o-mini", "Superwhisper"],
      wins: ["Rapid exploration of 3 solution spaces in one day", "Discovery through AI \u2014 found val.town built-in OpenAI access", "$0/month on free tiers"],
      quote: "For a PM who can read code and has opinions about what should be built, AI coding assistants are transformative.",
      visual: { bg: "linear-gradient(135deg, #2a0a0a, #4a1010)", title: "Social monitor", detail: "$0/month", sub: "Japanese X \u2192 Slack via LLM filter" },
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
    { text: "The flywheel is starting to spin.", author: "Robbie Preswick", project: "Agent 515" }
  ];

  // --- Safe text helper (avoid innerHTML XSS) ---
  function esc(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
              "\u2605 Vote for this project " +
              '<span class="price">$1 via Stripe Checkout</span>' +
            "</button>" +
          "</div>" +
        "</div>";
    }
    grid.innerHTML = html;
  }

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
    btn.textContent = "Redirecting to Checkout...";
    btn.style.opacity = "0.6";
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
        btn.innerHTML = "\u2605 Vote for this project <span class=\"price\">$1 via Stripe Checkout</span>";
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    })
    .catch(function (err) {
      window.alert("Network error. Please try again.");
      btn.innerHTML = "\u2605 Vote for this project <span class=\"price\">$1 via Stripe Checkout</span>";
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
        banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:999;background:linear-gradient(135deg,#635bff,#30d158);color:#fff;text-align:center;padding:16px;font-weight:600;font-size:15px;";
        banner.textContent = "Vote recorded for \"" + project.name + "\"! Thank you.";
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
