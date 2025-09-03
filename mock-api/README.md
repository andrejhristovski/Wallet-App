# Mock API Server

A minimal Express server that simulates the Native Teams API for development and testing purposes.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

The server will start on port 4000 by default.

## Authentication

1. First, authenticate to get an access token:

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

2. Use the returned `accessToken` in the Authorization header for subsequent requests:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:4000/balances
```

## Available Endpoints

### Authentication

- `POST /auth/login` - Get access token (no auth required)

### Protected Endpoints (require Bearer token)

- `GET /balances` - Get account balances
- `GET /transactions` - Get paginated transactions (supports cursor pagination)
- `GET /transactions/:id` - Get specific transaction
- `POST /payouts` - Create a new payout
- `GET /beneficiaries` - Get list of beneficiaries

### Utility

- `GET /health` - Health check (no auth required)

## Data Structure

### Transaction Object

```json
{
  "id": "txn_abc123",
  "amount": 100.5,
  "currency": "EUR",
  "direction": "in|out",
  "status": "pending|completed|failed",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "counterparty": "Client A",
  "method": "bank_transfer|paypal|card",
  "fees": 2.5,
  "reference": "REF-ABC123"
}
```

### Balance Object

```json
{
  "currency": "EUR",
  "amount": 1250.75
}
```

### Beneficiary Object

```json
{
  "id": "ben_1",
  "name": "John Smith",
  "method": "bank_transfer",
  "accountMasked": "****1234"
}
```

## Example Usage

### Get Balances

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/balances
```

### Get Transactions (with pagination)

```bash
# First page
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/transactions

# Next page using cursor
curl -H "Authorization: Bearer YOUR_TOKEN" "http://localhost:4000/transactions?cursor=txn_abc123"
```

### Create Payout

```bash
curl -X POST http://localhost:4000/payouts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "EUR",
    "beneficiaryId": "ben_1",
    "note": "Payment for services"
  }'
```

## Features

- ✅ Express server with CORS enabled
- ✅ Bearer token authentication
- ✅ 20+ seeded transactions with realistic data
- ✅ Cursor-based pagination for transactions
- ✅ Balance management (subtracts from balance on payouts)
- ✅ Multiple currencies (EUR, USD)
- ✅ Various transaction statuses and methods
- ✅ Beneficiary management
- ✅ Error handling and validation

## Notes

- All data is stored in memory and resets when the server restarts
- Authentication accepts any valid email/password combination
- Tokens are stored in memory and reset on server restart
- The server seeds with ~20 random transactions on startup
