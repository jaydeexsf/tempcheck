# TempCheck Documentation Page Specification & Architecture

## Executive Summary
This document specifies the structural, UI/UX, and technical design for the **TempCheck Developer Documentation Portal** (`/docs`). It serves as the authoritative blueprint for building the interactive developer documentation hub.

---

## 1. Page Layout & UI Architecture

The documentation page uses a modern 3-column developer portal layout:

```
+-----------------------------------------------------------------------------------+
| GLOBAL NAVBAR (Logo, Docs, Pricing, Sign In, Get API Key)                         |
+--------------------------+----------------------------------+---------------------+
| LEFT SIDEBAR (Nav Tree)  | MAIN DOCUMENTATION CONTENT       | RIGHT SIDEBAR (TOC) |
| - Filter / Search Bar    | - Page Header & Badge            | - On This Page      |
| - Getting Started        | - Section Title & Intro          | - Code Language     |
| - Authentication         | - Technical Explanations         | - Quick Feedback    |
| - API Endpoints          | - Request / Response Schemas     |                     |
| - SDKs & Code Snippets   | - Code Blocks (cURL, JS, Py, Go) |                     |
| - Error Codes & Limits   | - Interactive Try-It Sandbox     |                     |
+--------------------------+----------------------------------+---------------------+
| GLOBAL FOOTER                                                                     |
+-----------------------------------------------------------------------------------+
```

---

## 2. All Required Sections & Details

### Section 1: Introduction & Core Concepts
- **Overview**: What TempCheck is (sub-50ms disposable email detection API).
- **Core Engine Mechanics**: Real-time domain resolution, MX record verification, honeypot domain tracking, and custom allow/deny lists.
- **Risk Score System**: Explaining the `risk_score` metric (`0.0` = clean/verified, `0.5` = free/public provider like Gmail, `1.0` = high-risk disposable domain).

---

### Section 2: Authentication & Security
- **Bearer Token Auth**: Every API request must pass the secret API key in the standard HTTP header:
  ```http
  Authorization: Bearer tc_live_xxxxxxxxxxxxxxxxxxxxxxxx
  ```
- **API Key Scopes**:
  - `check:read` - Execute email detection queries.
  - `domains:read` - Query domain intelligence database.
  - `account:manage` - Manage keys and billing quotas.
- **Best Practices**: Environment variables setup, backend server proxy recommendations (never expose secret keys in client-side frontend JavaScript).

---

### Section 3: API Endpoint Reference

#### Endpoint 1: Single Email Detection (`POST /v1/check-email`)
- **URL**: `https://api.tempcheck.com/v1/check-email`
- **Method**: `POST`
- **Request Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_API_KEY`
- **Request Body Schema**:
  ```json
  {
    "email": "user@10minutemail.com",
    "fast_mode": false,
    "custom_rules": true
  }
  ```
- **Response Schema (`200 OK`)**:
  ```json
  {
    "status": "success",
    "email": "user@10minutemail.com",
    "disposable": true,
    "domain": "10minutemail.com",
    "type": "disposable",
    "risk_score": 0.98,
    "details": {
      "mx_records_found": true,
      "free_provider": false,
      "subdomain_alias": false,
      "spam_trap_likelihood": "high"
    },
    "latency_ms": 18
  }
  ```

#### Endpoint 2: Bulk Email Batch Verification (`POST /v1/check-batch`)
- **URL**: `https://api.tempcheck.com/v1/check-batch`
- **Method**: `POST`
- **Payload**: Array of up to 100 emails per request.
- **Response Schema (`200 OK`)**: Array of verification objects.

#### Endpoint 3: Domain Intelligence Lookup (`POST /v1/check-domain`)
- **URL**: `https://api.tempcheck.com/v1/check-domain`
- **Method**: `POST`
- **Body**: `{"domain": "tempmail.org"}`

#### Endpoint 4: Disposable Domain Blacklist Sync (`GET /v1/domains/disposable`)
- **URL**: `https://api.tempcheck.com/v1/domains/disposable`
- **Method**: `GET`
- **Description**: Returns full or delta list of blacklisted temporary domains for local caching.

---

### Section 4: Response Codes & Error Handling

Standard JSON error envelope:
```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided secret API key is invalid or revoked.",
    "status": 401
  }
}
```

| HTTP Code | Error Code | Description |
| :--- | :--- | :--- |
| `200 OK` | - | Request succeeded cleanly. |
| `400 Bad Request` | `INVALID_EMAIL_FORMAT` | Email payload is missing or malformed. |
| `401 Unauthorized` | `INVALID_API_KEY` | Missing or invalid Authorization Bearer header. |
| `429 Too Many Requests` | `RATE_LIMIT_EXCEEDED` | Exceeded plan request limit. |
| `500 Server Error` | `INTERNAL_ERROR` | System anomaly; automatically triggers SLA retry. |

---

### Section 5: Rate Limits & Performance SLA
- **Response Headers**:
  - `X-RateLimit-Limit: 100000`
  - `X-RateLimit-Remaining: 99482`
  - `X-RateLimit-Reset: 1700000000`
- **Latency SLA**: Sub-50ms 99th percentile response time.

---

### Section 6: Client SDKs & Multi-Language Code Snippets
The Documentation Page includes interactive tabbed code blocks for:
1. **cURL**:
   ```bash
   curl -X POST https://api.tempcheck.com/v1/check-email \
     -H "Authorization: Bearer tc_live_demo123" \
     -H "Content-Type: application/json" \
     -d '{"email": "test@tempmail.com"}'
   ```
2. **Node.js / TypeScript**:
   ```typescript
   import { TempCheckClient } from '@tempcheck/sdk';

   const tempcheck = new TempCheckClient({ apiKey: process.env.TEMPCHECK_API_KEY });
   const result = await tempcheck.verify('user@tempmail.com');

   if (result.disposable) {
     throw new Error('Disposable email addresses are not permitted.');
   }
   ```
3. **Python**:
   ```python
   import requests

   response = requests.post(
       "https://api.tempcheck.com/v1/check-email",
       headers={"Authorization": "Bearer tc_live_demo123"},
       json={"email": "user@tempmail.com"}
   )
   data = response.json()
   print("Is Disposable:", data["disposable"])
   ```
4. **Go**:
   ```go
   req, _ := http.NewRequest("POST", "https://api.tempcheck.com/v1/check-email", body)
   req.Header.Set("Authorization", "Bearer tc_live_demo123")
   ```

---

### Section 7: Interactive Try-It API Sandbox
- Embedded live request builder in the documentation right panel.
- Inputs for `API Key` and `Test Email`.
- "Send Test Request" button rendering live JSON response formatted with syntax highlighting.

---

### Section 8: Webhooks & Event Notifications
- **Webhooks Setup**: Subscribing to `domain.blacklisted` events to keep downstream auth servers instantly synchronized when new temporary domains are identified.
