# Prostuti Server 🚀

An industry-standard, secure, and robust Backend REST API for **Prostuti** — a premium EdTech & Learning Management System (LMS) platform. Built using **Node.js**, **Express.js**, and **MongoDB**, this server handles role-based access control, secure authentication, automated OTP verifications, and cross-origin resource validation.

## 🌟 Key Features

*   **Secure Authentication:** JWT-based user authentication along with automated Email OTP verification for new registrations and secure Password Reset flows.
*   **Course Management:** Dynamic CRUD functionalities for courses, tracking pricing, structural durations, and payment methods.
*   **Robust Enrollment Architecture:** Multi-stage enrollment validation (`Pending` ➡️ `Approved` / `Rejected`) backed by Transaction ID and Paid Number tracing.
*   **Dynamic Data Privacy Rules:** Smart access guardrails restricting live classes, notices, and exam links exclusively to approved and active enrollees.
*   **Production Ready Configuration:** Fully optimized for seamless serverless scaling on deployment platforms like **Vercel**.

---

## 🛠️ Tech Stack

*   **Runtime Environment:** Node.js
*   **Backend Framework:** Express.js
*   **Database:** MongoDB (using Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT) & BcryptJS
*   **Mailing System:** Nodemailer (Gmail SMTP integration)
*   **Deployment Support:** Vercel Serverless

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following software installed:
*   [Node.js](https://nodejs.org/) (v16.x or higher)
*   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or MongoDB Local instance

### Installation & Local Setup

1. **Clone the repository:**
```bash
   git clone [https://github.com/hossainrabbii/Prostuti-server.git](https://github.com/hossainrabbii/Prostuti-server.git)
   cd Prostuti-server