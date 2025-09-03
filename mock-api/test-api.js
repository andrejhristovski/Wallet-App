const axios = require("axios");

const BASE_URL = "http://localhost:4000";

async function testAPI() {
  console.log("🧪 Testing Mock API Server\n");

  try {
    // 1. Test health endpoint
    console.log("1. Testing health endpoint...");
    const health = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health check:", health.data);

    // 2. Test authentication
    console.log("\n2. Testing authentication...");
    const auth = await axios.post(`${BASE_URL}/auth/login`, {
      email: "test@example.com",
      password: "password",
    });
    const token = auth.data.accessToken;
    console.log("✅ Authentication successful, token received");

    // 3. Test balances
    console.log("\n3. Testing balances endpoint...");
    const balances = await axios.get(`${BASE_URL}/balances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Balances:", balances.data);

    // 4. Test transactions
    console.log("\n4. Testing transactions endpoint...");
    const transactions = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(
      `✅ Transactions: ${transactions.data.data.length} transactions returned`
    );
    console.log("   First transaction:", transactions.data.data[0]);

    // 5. Test beneficiaries
    console.log("\n5. Testing beneficiaries endpoint...");
    const beneficiaries = await axios.get(`${BASE_URL}/beneficiaries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Beneficiaries:", beneficiaries.data);

    // 6. Test payout creation
    console.log("\n6. Testing payout creation...");
    const payout = await axios.post(
      `${BASE_URL}/payouts`,
      {
        amount: 25,
        currency: "EUR",
        beneficiaryId: "ben_1",
        note: "Test payout from script",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("✅ Payout created:", payout.data.data);

    // 7. Test updated balances
    console.log("\n7. Testing updated balances...");
    const updatedBalances = await axios.get(`${BASE_URL}/balances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Updated balances:", updatedBalances.data);

    // 8. Test transaction details
    console.log("\n8. Testing transaction details...");
    const transactionDetails = await axios.get(
      `${BASE_URL}/transactions/${payout.data.data.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("✅ Transaction details:", transactionDetails.data);

    // 9. Test pagination
    console.log("\n9. Testing pagination...");
    const nextPage = await axios.get(
      `${BASE_URL}/transactions?cursor=${transactions.data.data[0].id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(`✅ Next page: ${nextPage.data.data.length} transactions`);
    console.log("   Has next cursor:", !!nextPage.data.nextCursor);

    console.log("\n🎉 All tests passed! Mock API is working correctly.");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
