# Authentication & Authorization (MERN Stack)

A complete, production-style **authentication & authorization** system built with the **MERN stack** (MongoDB, Express, React, Node.js). It covers the full auth journey registration, email verification, login, JWT protection, role-based access control, forgot/reset password with OTP everything handled securely and following modern best practices.

---

## Features

- **User Registration** with a "pending" status until email is verified
- **Email Verification** secure token-based verification link (expires in 24 hours) sent via Nodemailer
- **Resend Verification Email** for users who missed the original link
- **Login** with JWT (access token) generation
- **Protected Routes** verified + active users only (JWT Bearer token)
- **Role-Based Access Control (RBAC)** `user` and `admin` roles with restricted admin-only routes
- **Forgot / Reset Password** 6-digit OTP sent to email, Verified with expiry (10 minutes), then reset
- **Resend OTP** for convenience
- **Route Guards on Frontend** `ProtectedRoute` and `GuestRoute` wrappers using React Router
- **Redux Toolkit** state management for global auth state (token + user)
- **Form Validation** with React Hook Form + Zod (schema-based, both ends of the stack)
- **Modern UI** React 19, Tailwind CSS 4, shadcn/ui-style components (Base UI)
- **Centralized Error Handling & Friendly API Responses**

---

## Tech Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Frontend  | React, Redux Toolkit, React Router, Tailwind CSS, Axios |
| Backend   | Node.js, Express                                        |
| Database  | MongoDB Atlas + Mongoose (ODM)                          |
| Security  | Argon2 (hashing), JWT, Zod (validation), CORS          |
| Email     | Nodemailer (transactional emails + OTP)                |

---

## External Packages

### Backend (`backend/package.json`)

| Package      | What it does                                                    |
| ------------ | --------------------------------------------------------------- |
| **express**  | Web framework handles routes, middleware & API requests       |
| **mongoose** | ODM for MongoDB schemas, models & database connection         |
| **argon2**   | Strong password hashing & verification (more secure than bcrypt)|
| **jsonwebtoken** | Creates & verifies JWT tokens for authentication            |
| **nodemailer** | Sends emails  verification link & password reset OTP          |
| **zod**      | Schema validation for request data (backend side)               |
| **cors**     | Allows the frontend to securely call the backend API            |
| **chalk**    | Pretty, colored console logs for better server output           |

### Frontend (`frontend/package.json`)

| Package                    | What it does                                                       |
| -------------------------- | ------------------------------------------------------------------ |
| **react** / **react-dom**  | Core UI library (version 19)                                       |
| **react-router-dom**       | Client-side routing + route guards (`ProtectedRoute`, `GuestRoute`)|
| **@reduxjs/toolkit**       | Global state management auth slice (token, user)                 |
| **react-redux**            | Connects React components to the Redux store                       |
| **axios**                  | HTTP client with interceptors (auto-attaches the JWT token)        |
| **react-hook-form**        | Simple, performant form handling                                   |
| **@hookform/resolvers**    | Connects Zod schemas to react-hook-form                            |
| **zod**                    | Schema-based form validation (frontend side)                       |
| **tailwindcss**            | Utility-first CSS framework for styling (v4)                       |
| **@tailwindcss/vite**      | Tailwind integration with Vite                                     |
| **tw-animate-css**         | Lightweight animation utilities for Tailwind                       |
| **@base-ui/react**         | Headless, accessible UI primitives (shadcn/ui v4 components)       |
| **shadcn**                 | CLI to generate shadcn-style components                            |
| **class-variance-authority** | Builds reusable, variant-aware classNames (sx/ui components)     |
| **cn**                     | Tiny helper to merge / dedupe class names                          |
| **input-otp**              | Ready-made OTP input component for the verify-OTP page             |
| **lucide-react**           | Beautiful, lightweight open-source icons                           |
| **@fontsource-variable/geist** | Geist variable font for clean typography                       |
| **vite**                   | Fast dev server + build tool for React                             |
| **eslint** + plugins       | Code quality / linting                                             |

> Dev dependencies like `@vitejs/plugin-react`, `@types/react`, `globals`, etc. only help during development/build they don't ship to production.

---

## Project Structure

```
authentication-authorization-mern/
├── backend/
│   ├── config/          # DB connection, CORS options, env loader
│   ├── controllers/     # Auth & page logic
│   ├── middlewares/     # JWT protect + role restriction
│   ├── models/          # Mongoose User model
│   ├── routes/          # Auth & page routes
│   ├── utils/           # OTP generator, email & OTP senders
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
└── frontend/
    └── src/
        ├── api/         # Axios instance with auth interceptor
        ├── components/  # Reusable UI & layouts
        ├── constants/   # Route constants
        ├── hooks/       # Custom hooks
        ├── lib/         # Utility helpers (cn, etc.)
        ├── models/      # (utils/models)
        ├── pages/       # Login, Register, Forgot/Reset Password,
        │                #   VerifyEmail, VerifyOTP, Home, NotFound
        ├── providers/   # Context / provider wrappers
        ├── routes/      # React Router config
        └── store/       # Redux store + auth slice
```

---

## API Endpoints

Base URL: `http://localhost:<PORT>/api/v1`

| Method | Endpoint             | Auth | Description                     |
| ------ | -------------------- | ---- | ------------------------------- |
| POST   | `/auth/register`     | No   | Register a new user             |
| GET    | `/auth/verify-email` | No   | Verify email via token link     |
| POST   | `/auth/resend-verification` | No | Resend verification email    |
| POST   | `/auth/login`        | No   | Login & get JWT token           |
| POST   | `/auth/forgot-password` | No  | Request password reset OTP      |
| POST   | `/auth/verify-otp`   | No   | Verify the reset OTP            |
| POST   | `/auth/resend-otp`   | No   | Resend a new OTP                |
| POST   | `/auth/reset-password` | No  | Set a new password with OTP     |
| GET    | `/auth/me`           | Yes  | Get current logged-in user      |
| GET    | `/`                  | Yes  | Home (protected)                |
| GET    | `/admin-settings`    | Yes+Admin | Admin-only page            |
| GET    | `/about`, `/services` | No  | Public pages                    |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas) and a SMTP email account (e.g. Gmail App Password, Mailtrap)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd authentication-authorization-mern

# Backend
cd backend
npm install
cp .env.example .env   # then fill in your values

# Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env   # then fill in your values
```

### 2. Environment variables

**Backend `.env`**

```env
PORT=5000
DATABASE_NAME=your_db_name
DATABASE_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

**Frontend `.env`**

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> For development emails, you can use **Mailtrap** (a safe SMTP sandbox) real Gmail credentials are only needed when going live.

### 3. Run the project

```bash
# Backend
cd backend
npm run dev        # http://localhost:5000

# Frontend
cd frontend
npm run dev        # http://localhost:5173
```

---

## How It Works (Auth Flow)

1. **Register** → user is created with `status: pending` and a verification token is emailed.
2. **Verify email** → clicking the token link sets `isEmailVerified: true` and `status: active`.
3. **Login** → verified & active users receive a JWT (valid `7d` by default).
4. **Protected routes** → the `protect` middleware checks the `Authorization: Bearer <token>` header.
5. **Role-based access** → `restrictTo("admin")` allows only admin users on admin routes.
6. **Forgot password** → an OTP is generated (6 digits, 10 min expiry) and emailed via Nodemailer; the user resets the password after OTP verification.

---

## Security Highlights

- Passwords hashed with **Argon2** (memory-hard, GPU-resistant)
- Passwords excluded from DB queries by default (`select: false`)
- JWT tokens signed with a secret and expiry
- Server-side validation via **Zod** + client-side validation via react-hook-form
- Razor-sharp email verification tokens (32-byte random hex) with 24h expiry
- OTPs expire after 10 minutes and are single-use
- Proper CORS configuration and 401/403 error messaging

---

## Possible Future Enhancements

- Refresh token rotation + HTTP-only cookies
- Google / GitHub social login (Passport / OAuth)
- Two-factor authentication (2FA/TOTP)
- Admin panel for user management (block/activate users)
- Rate limiting on auth endpoints (`express-rate-limit`)
- Automated tests (Jest / Vitest + Supertest)

---

## License

This project is open source and available under the **MIT License**.

Made with **React, Express, MongoDB & Node.js** a complete MERN authentication setup, ready for a portfolio.