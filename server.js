const express = require("express");
const path = require("path");

// --- Config ---
const PORT = process.env.PORT || 3000;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_REPLACE_ME";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- Project catalog (matches pm-aication.js) ---
const projects = [
  { id: 1, name: "Agent 515 Weekly Synthesis", author: "Robbie Preswick" },
  { id: 2, name: "Machine Payments Coffee Order", author: "Jennifer Lee" },
  { id: 3, name: "Friction Point Aggregation Tool", author: "Alexandra Scolieri" },
  { id: 4, name: "SOC2 Report Sharing SaaS", author: "Dan Stokeley" },
  { id: 5, name: "Smart Contract Analysis", author: "Meghna Mehta" },
  { id: 6, name: "BashBoard", author: "Narek Tamoyan" },
  { id: 7, name: "AI-Optimized PM Workflows", author: "Josh Ackerman" },
  { id: 8, name: "Radar for Platforms Sales Support", author: "Alisa Noll" },
  { id: 9, name: "Easy Point of Sale", author: "Kate Brennan" },
  { id: 10, name: "Soura \u2014 Relationship Health Check", author: "Jennifer Lee" },
  { id: 11, name: "VAT ID Pattern Validation", author: "Rutvij Oza" },
  { id: 12, name: "VAT/GST Registration Advisor", author: "Aleksandra Bal" },
  { id: 13, name: "RISA Compliance Survey Refresh", author: "Daniel Heffernan" },
  { id: 14, name: "Stripe Japan X Monitor", author: "Daniel Heffernan" },
  { id: 15, name: "Shelf Help Books", author: "Gary Pelissier" },
  { id: 16, name: "Terminal Dashboard Onboarding Prototype", author: "Denise Young" },
  { id: 17, name: "Refund Friction Analyst", author: "Vighnesh Kumar Pathak" },
  { id: 18, name: "3DS Product Suite", author: "Cip Blujdea" },
  { id: 19, name: "AI-cation Multi-Project", author: "Daniel Loke" },
  { id: 20, name: "Trial Email Bug Fix", author: "Oliver W." },
  { id: 21, name: "Capital Weekly Periods Admin Fix", author: "Cecelia Shao" },
  { id: 22, name: "Org-level Blueprints in Workbench", author: "David Wood" },
  { id: 23, name: "Daily Meeting Brief Skill", author: "Jaeel" },
  { id: 24, name: "Connect Distribution Trends Agent", author: "David Yang" },
  { id: 25, name: "Money Management Mobile App", author: "Lola" },
  { id: 26, name: "Instant Payouts Element Prototype", author: "Ha Lee" },
  { id: 27, name: "Connect Traits Explorer", author: "Ivan Ribeiro" },
  { id: 28, name: "Fund Flow Agent", author: "Hernan Herrera" },
  { id: 29, name: "Partner Reporting Platform Fix", author: "RK" },
  { id: 30, name: "Product Changelog & Slack App", author: "Miles M." },
  { id: 31, name: "Enterprise Cost Management Prototype", author: "Paul Meagher" },
];

// --- Create Checkout Session ---
app.post("/create-checkout-session", async (req, res) => {
  const { projectId } = req.body;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 100, // $1.00
            product_data: {
              name: `Vote: ${project.name}`,
              description: `PM-aication Week vote for "${project.name}" by ${project.author}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        project_id: String(project.id),
        project_name: project.name,
        event: "pm-aication-2026",
      },
      success_url: `${BASE_URL}/pm-aication.html?voted=${project.id}#success`,
      cancel_url: `${BASE_URL}/pm-aication.html#vote`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Vote tally (reads completed Checkout Sessions) ---
app.get("/vote-tally", async (req, res) => {
  try {
    const sessions = [];
    let hasMore = true;
    let startingAfter = undefined;

    // Paginate through completed sessions with our metadata
    while (hasMore) {
      const params = { limit: 100, status: "complete" };
      if (startingAfter) params.starting_after = startingAfter;

      const page = await stripe.checkout.sessions.list(params);

      for (const s of page.data) {
        if (s.metadata && s.metadata.event === "pm-aication-2026") {
          sessions.push({
            project_id: parseInt(s.metadata.project_id, 10),
            project_name: s.metadata.project_name,
            amount: s.amount_total,
            customer_email: s.customer_details?.email || null,
          });
        }
      }

      hasMore = page.has_more;
      if (page.data.length > 0) {
        startingAfter = page.data[page.data.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    // Aggregate votes per project
    const tally = {};
    for (const s of sessions) {
      if (!tally[s.project_id]) {
        tally[s.project_id] = { name: s.project_name, votes: 0, amount: 0 };
      }
      tally[s.project_id].votes += 1;
      tally[s.project_id].amount += s.amount || 0;
    }

    res.json({
      total_votes: sessions.length,
      total_amount_cents: sessions.reduce((sum, s) => sum + (s.amount || 0), 0),
      projects: tally,
    });
  } catch (err) {
    console.error("Vote tally error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Fallback: serve the main page ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pm-aication.html"));
});

app.listen(PORT, () => {
  console.log(`PM-aication Command Center running at ${BASE_URL}`);
  console.log(`Stripe key: ${STRIPE_SECRET_KEY.slice(0, 8)}...`);
});
