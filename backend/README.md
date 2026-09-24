# Backend — Auth API (Node.js + Express)

The backend API for the **Authentication & Authorization (MERN)** project. It handles registration, email verification, JWT-based login, role-based access, and the OTP-based password reset flow.

---

## What's included

- User registration with a pending status — account activates only after email verification
- Email verification via a tokenized link (24-hour expiry) sent through Nodemailer
- Login endpoint that issues a JWT for verified users
- `protect` middleware that validates the Bearer token on protected routes
- `restrictTo` middleware for role-based access (admin-only routes)
- Forgot password flow built around a 6-digit OTP (10-minute expiry) with resend support
- Passwords hashed with Argon2 before they touch the database
- Zod validation, CORS configuration, and consistent JSON error responses

## Stack

| Piece        | Tool                 |
| ------------ | -------------------- |
| Runtime      | Node.js              |
| Framework    | Express              |
| Database     | MongoDB + Mongoose   |
| Auth         | JWT + Argon2         |
| Email        | Nodemailer           |
| Validation   | Zod                  |

## Folder layout

```
backend/
├── config/
│   ├── corsOptions.js   # CORS whitelist for allowed origins
│   ├── db.js            # MongoDB connection
│   └── env.js           # Loads and exposes env vars
├── controllers/
│   ├── auth.controller.js
│   └── page.controller.js
├── middlewares/
│   ├── auth.middleware.js   # protect + restrictTo
│   └── role.middleware.js
├── models/
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   └── page.routes.js
├── utils/
│   ├── generateOTP.js
│   ├── sendEmail.js     # Nodemailer transporter + verification 
│   └── sendOTP.js       # Password reset OTP mail
├── app.js
├── server.js
└── .env.example
```

Running the app is straightforward — `app.js` wires up the middleware and routes, `server.js` connects to the database and starts the server.

## API endpoints

Base URL — `http://localhost:<PORT>/api/v1`

| Method | Endpoint                   | Auth | Description                       |
| ------ | -------------------------- | ---- | --------------------------------- |
| POST   | `/auth/register`           | No   | Create a new user                 |
| GET    | `/auth/verify-email`       | No   | Verify email with token           |
| POST   | `/auth/resend-verification`| No   | Send a fresh verification email   |
| POST   | `/auth/login`              | No   | Login, returns a JWT              |
| POST   | `/auth/forgot-password`    | No   | Request a password reset OTP      |
| POST   | `/auth/verify-otp`         | No   | Check the OTP is valid            |
| POST   | `/auth/resend-otp`         | No   | Resend the OTP                    |
| POST   | `/auth/reset-password`     | No   | Set a new password after OTP      |
| GET    | `/auth/me`                 | Yes  | Current logged-in user            |
| GET    | `/`                        | Yes  | Home, welcomes the user           |
| GET    | `/admin-settings`          | Yes  | Admin only                        |
| GET    | `/about`, `/services`      | No   | Public pages                      |

## Getting started

Prerequisites: Node.js 18+, a MongoDB instance (local or Atlas), and SMTP credentials (a Gmail app password or a Mailtrap sandbox for testing).

```bash
cd backend
npm install
cp .env.example .env
```

Fill in the environment variables:

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

Then start the server:

```bash
npm run dev
```

`npm run dev` loads the `.env` file and auto-restarts on file changes. `npm start` runs the app without watching.

## How the auth flow works

1. **Register** — the user is saved with `status: pending`, and a verification link is emailed to them.
2. **Verify email** — opening the link marks the account as verified and sets `status: active`.
3. **Login** — only verified, active users get a JWT.
4. **Protected routes** — the `protect` middleware decodes the token and loads the user onto `req.user`.
5. **Role checks** — `restrictTo("admin")` blocks non-admin users with a 403.
6. **Password reset** — a 6-digit OTP is generated and emailed; the user verifies it and sets a new password.

## Some notes on the security side

- Argon2 is used for password hashing — it's slower by design and much harder to brute-force than bcrypt.
- The password field is selected out of normal queries, so it's never returned to the client.
- OTPs expire after 10 minutes; verification tokens after 24 hours. Both are single-use.
- JWT is signed with a secret from the environment and has a configurable expiry.