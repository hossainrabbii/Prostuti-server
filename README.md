# MailForge — Server

> Automated email outreach platform backend built with Express.js, TypeScript, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-4-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb)

---

## Overview

MailForge is a full-stack email outreach automation platform. This repository contains the **backend** — a RESTful Express.js API with JWT authentication, role-based access control, bulk email automation, and real-time delivery tracking via Server-Sent Events.

---

## Features

- **Authentication** — Register, login, logout with JWT access + refresh token rotation
- **Secure cookies** — Refresh token stored in httpOnly cookie, access token in response body
- **Role-based access control** — Admin and user roles with route-level middleware protection
- **Lead management** — Full CRUD with duplicate detection, sparse unique indexes, and timezone-aware `sentAt` tracking
- **Template engine** — Dynamic `{{variable}}` resolution from lead data at send time
- **Bulk email queue** — Sequential sending with randomized 1–5 minute delays between emails
- **Server-Sent Events** — Real-time push notifications to connected frontend clients
- **Global error handling** — Centralised error handler for MongoDB errors, validation, cast errors, and duplicates
- **CORS** — Configured for cross-domain requests with credential support

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js 20 |
| Framework | Express.js 4 |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password hashing | bcryptjs |
| Email | Nodemailer |
| Real-time | Server-Sent Events (SSE) |
| Validation | Mongoose schema validation |

---

## Project Structure

```
server/
├── src/
│   ├── app.ts                          # Express app setup (CORS, middleware)
│   ├── server.ts                       # Entry point
│   ├── appConfig/
│   │   └── index.ts                    # Environment variable config
│   ├── app/
│   │   ├── routes/
│   │   │   └── routes.ts               # Central route registry
│   │   └── utils/
│   │       ├── errorHandler.ts         # Global error handler
│   │       └── timezone.ts             # Country → timezone mapping
│   ├── middleware/
│   │   └── authenticate.ts             # JWT verify + admin guard
│   ├── module/
│   │   ├── Auth/
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.model.ts           # User schema with pre-save hash
│   │   │   ├── auth.controller.ts      # Register, login, refresh, logout, me
│   │   │   └── auth.route.ts
│   │   ├── Website/                    # Lead management
│   │   │   ├── website.interface.ts
│   │   │   ├── website.model.ts
│   │   │   ├── website.service.ts
│   │   │   ├── website.controller.ts
│   │   │   └── website.route.ts
│   │   ├── template/
│   │   │   ├── template.interface.ts
│   │   │   ├── template.model.ts
│   │   │   ├── template.service.ts
│   │   │   ├── template.controller.ts
│   │   │   └── template.route.ts
│   │   └── Mail/
│   │       ├── mail.controller.ts      # Send bulk, send single, SSE endpoint
│   │       └── mail.route.ts
│   ├── services/
│   │   ├── mailQueue.service.ts        # Bulk send loop with random delays
│   │   └── sendMail.ts                 # Nodemailer transport
│   └── utils/
│       └── sseEmitter.ts               # SSE client store + emitter
├── .env
├── vercel.json
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database (local or Atlas)
- SMTP credentials (Gmail, SendGrid, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mailforge-server.git
cd mailforge-server

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
NODE_ENV=development

MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/mailforgedb

ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

> **Note:** For Gmail, use an App Password — not your account password. Generate one at myaccount.google.com/apppasswords.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start:prod
```

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login | Public |
| POST | `/api/v1/auth/refresh` | Refresh access token | Public |
| POST | `/api/v1/auth/logout` | Logout | Protected |
| GET | `/api/v1/auth/me` | Get current user | Protected |

### Leads (Websites)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/website` | Get all leads | Admin |
| GET | `/api/v1/website/:id` | Get single lead | Admin |
| POST | `/api/v1/website` | Create lead | Admin |
| PATCH | `/api/v1/website/:id` | Update lead | Admin |
| DELETE | `/api/v1/website/:id` | Delete lead | Admin |

### Templates

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/templates` | Get all templates | Admin |
| GET | `/api/v1/templates/:id` | Get single template | Admin |
| POST | `/api/v1/templates` | Create template | Admin |
| PATCH | `/api/v1/templates/:id` | Update template | Admin |
| DELETE | `/api/v1/templates/:id` | Delete template | Admin |

### Mail

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/mail/send` | Start bulk mail queue | Admin |
| POST | `/api/v1/mail/send-single` | Send single mail | Admin |
| GET | `/api/v1/mail/events` | SSE stream for live updates | Public |

---

## Authentication Flow

```
POST /auth/login
→ Verify credentials with bcrypt
→ Sign accessToken (2h) + refreshToken (7d)
→ Set refreshToken as httpOnly cookie (sameSite: none, secure: true)
→ Return accessToken in response body

POST /auth/refresh
→ Read refreshToken from cookie
→ Verify and fetch fresh user from DB (picks up role changes)
→ Issue new accessToken + rotated refreshToken
→ Return new accessToken

POST /auth/logout
→ Clear refreshToken cookie
```

---

## Template Variables

Templates support dynamic `{{variable}}` placeholders resolved from lead data at send time:

```
{{name}}          → Lead name
{{currentUrl}}    → Lead current website URL
{{remakeUrl}}     → Redesigned site URL
{{remakeSection}} → Full HTML block with remake link
{{mailId}}        → Lead email address
{{phone}}         → Lead phone number
{{city}}          → Lead city
{{country}}       → Lead country
```

Any field present on the lead model can be used as a variable.

---

## SSE Events

The `/api/v1/mail/events` endpoint streams the following events:

| Event | Payload | Description |
|---|---|---|
| `status` | `{ id, status }` | Mail processing started |
| `mail_sent` | `{ id, name, mail, message }` | Mail sent successfully |
| `mail_failed` | `{ id, message }` | Mail failed |
| `countdown` | `{ delayMs, delayMins, message }` | Waiting between sends |
| `done` | `{ message }` | All mails processed |
| `error` | `{ message }` | Queue error |

---

## Error Handling

All errors are caught and forwarded to the global error handler which returns consistent JSON:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Handled error types:
- MongoDB duplicate key (11000) — returns field-specific message
- Mongoose validation error — returns all field errors joined
- Mongoose cast error — returns invalid field info
- General errors — returns `error.message`

---

## Deployment

This project is deployed on **Vercel** using a `vercel.json` configuration.

```json
{
  "version": 2,
  "builds": [{ "src": "dist/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "dist/server.js" }]
}
```

**Required environment variables on Vercel:**

```
MONGODB_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
EMAIL_USER=
EMAIL_PASS=
NODE_ENV=production
```

> **Important:** Set `NODE_ENV=production` on Vercel so cookies are set with `secure: true`.

---

## Known Limitations

- Long-running bulk mail queues may hit Vercel's serverless function timeout — consider deploying to a persistent server (Render, Railway) for large batches
- SSE connections are not persisted across serverless function instances

---

## License

MIT
