const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage
let transactions = [];
let balances = [
  { currency: "EUR", amount: 1250.75 },
  { currency: "USD", amount: 850.5 },
];

let beneficiaries = [
  {
    id: "ben_1",
    name: "John Smith",
    method: "bank_transfer",
    accountMasked: "****1234",
  },
  {
    id: "ben_2",
    name: "Jane Doe",
    method: "paypal",
    accountMasked: "jane.doe@email.com",
  },
  {
    id: "ben_3",
    name: "Bob Johnson",
    method: "bank_transfer",
    accountMasked: "****5678",
  },
];

// Valid tokens (in a real app, this would be stored securely)
const validTokens = new Set();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  if (!validTokens.has(token)) {
    return res.status(403).json({ error: "Invalid token" });
  }

  next();
};

// Seed transactions with mock data
const seedTransactions = () => {
  const statuses = ["pending", "completed", "failed"];
  const directions = ["in", "out"];
  const currencies = ["EUR", "USD"];
  const methods = ["bank_transfer", "paypal", "card"];
  const counterparties = [
    "Client A",
    "Client B",
    "Client C",
    "Vendor X",
    "Vendor Y",
  ];

  for (let i = 0; i < 20; i++) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const amount = Math.floor(Math.random() * 1000) + 10;
    const currency = currencies[Math.floor(Math.random() * currencies.length)];

    transactions.push({
      id: `txn_${nanoid(8)}`,
      amount: amount,
      currency: currency,
      direction: direction,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      counterparty:
        counterparties[Math.floor(Math.random() * counterparties.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      fees: direction === "out" ? Math.floor(Math.random() * 5) + 1 : null,
      reference: `REF-${nanoid(6).toUpperCase()}`,
    });
  }

  // Sort by creation date (newest first)
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Routes

// POST /auth/login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Mock authentication - accept any valid email/password
  if (email && password) {
    const accessToken = nanoid(32);
    validTokens.add(accessToken);

    res.json({
      accessToken,
      tokenType: "Bearer",
      expiresIn: 3600,
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// GET /balances
app.get("/balances", authenticateToken, (req, res) => {
  res.json({ data: balances });
});

// GET /transactions
app.get("/transactions", authenticateToken, (req, res) => {
  const { cursor } = req.query;
  const pageSize = 10;

  let filteredTransactions = [...transactions];

  // Simple cursor-based pagination
  if (cursor) {
    const cursorIndex = transactions.findIndex((t) => t.id === cursor);
    if (cursorIndex !== -1) {
      filteredTransactions = transactions.slice(cursorIndex + 1);
    }
  }

  const pageTransactions = filteredTransactions.slice(0, pageSize);
  const nextCursor =
    filteredTransactions.length > pageSize
      ? pageTransactions[pageTransactions.length - 1].id
      : null;

  res.json({
    data: pageTransactions,
    nextCursor,
  });
});

// GET /transactions/:id
app.get("/transactions/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.json({ data: transaction });
});

// POST /payouts
app.post("/payouts", authenticateToken, (req, res) => {
  const { amount, currency, beneficiaryId, note } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required" });
  }

  // Check if we have sufficient balance
  const balance = balances.find((b) => b.currency === currency);
  if (!balance || balance.amount < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Subtract from balance
  balance.amount -= amount;

  // Create new transaction
  const newTransaction = {
    id: `txn_${nanoid(8)}`,
    amount: amount,
    currency: currency,
    direction: "out",
    status: "pending",
    createdAt: new Date().toISOString(),
    counterparty: beneficiaryId
      ? beneficiaries.find((b) => b.id === beneficiaryId)?.name || "Unknown"
      : "Manual Payout",
    method: "bank_transfer",
    fees: 2.5,
    reference: `PAYOUT-${nanoid(6).toUpperCase()}`,
    note: note,
  };

  // Add to beginning of transactions array
  transactions.unshift(newTransaction);

  res.json({ data: newTransaction });
});

// GET /beneficiaries
app.get("/beneficiaries", authenticateToken, (req, res) => {
  res.json({ data: beneficiaries });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Initialize server
const startServer = () => {
  seedTransactions();

  app.listen(PORT, () => {
    console.log(`🚀 Mock API server running on port ${PORT}`);
    console.log(`📊 Seeded with ${transactions.length} transactions`);
    console.log(`💰 Current balances:`, balances);
    console.log(`👥 Available beneficiaries:`, beneficiaries.length);
    console.log(`\n🔗 Available endpoints:`);
    console.log(`   POST /auth/login`);
    console.log(`   GET  /balances`);
    console.log(`   GET  /transactions`);
    console.log(`   GET  /transactions/:id`);
    console.log(`   POST /payouts`);
    console.log(`   GET  /beneficiaries`);
    console.log(`   GET  /health`);
  });
};

startServer();
