# Frontend   Auth App (React + Vite)

The React frontend for the **Authentication & Authorization (MERN)** project. It provides all the UI for registration, login, email verification, and password reset flows, with route guards, Redux state management, and modern Tailwind styling.

---

## Features

- **Login & Register** pages with schema-based validation (React Hook Form + Zod)
- **Email Verification** screen
- **Forgot Password → Verify OTP → Reset Password** flow with an OTP input UI
- **Route Guards**   `ProtectedRoute` (only for logged-in users) and `GuestRoute` (only for guests)
- **Global Auth State** Redux Toolkit slice keeps the token + user in sync
- **Axios Interceptor** automatically attaches the JWT Bearer token to every API request
- **Clean Layouts** separate `AuthLayout` (login/register) and `AppLayout` (protected app)
- **Modern UI** Tailwind CSS 4 + Base UI components (shadcn-style), Geist font, Lucide icons

---

## Tech Stack

| Concern          | Package                                              |
| ---------------- | ---------------------------------------------------- |
| Framework        | React 19 (via Vite 8)                                |
| Routing          | React Router DOM                                     |
| State Management | Redux Toolkit + React Redux                          |
| HTTP Client      | Axios                                                |
| Forms            | React Hook Form + `@hookform/resolvers`              |
| Validation       | Zod                                                  |
| Styling          | Tailwind CSS 4 + `tw-animate-css`                    |
| UI Components    | `@base-ui/react` + shadcn CLI                        |
| Icons / Font     | lucide-react + `@fontsource-variable/geist`          |

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance + auth token interceptor
│   ├── assets/
│   ├── components/
│   │   └── layouts/          # AppLayout, AuthLayout (+ shared UI)
│   ├── constants/
│   │   └── routes.constants.js
│   ├── hooks/
│   ├── lib/                  # helper utilities (cn, etc.)
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   ├── GuestRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── errors/
│   │   │   └── NotFound.jsx
│   │   └── Home.jsx
│   ├── providers/
│   ├── routes/
│   │   └── router.jsx        # createBrowserRouter config
│   ├── store/
│   │   ├── store.js          # Redux store
│   │   └── slices/auth.slice.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## Pages / Routes

| Route               | Component        | Guard          | Purpose                     |
| ------------------- | ---------------- | -------------- | --------------------------- |
| `/auth/login`       | Login            | GuestRoute     | User login                  |
| `/auth/register`    | Register         | GuestRoute     | New user registration       |
| `/auth/forgot-password` | ForgotPassword | GuestRoute  | Enter email for reset       |
| `/auth/verify-otp`  | VerifyOTP        | GuestRoute     | Enter OTP from email        |
| `/auth/reset-password` | ResetPassword  | GuestRoute     | Set a new password          |
| `/auth/verify-email` | VerifyEmail     | GuestRoute     | Email verification status   |
| `/`                 | Home             | ProtectedRoute | Home   only for logged-in   |
| `*`                 | NotFound         |                | 404 page                    |

---

## Getting Started

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> This should point to your running backend. The default dev backend runs on `http://localhost:5000`.

### 3. Run the dev server

```bash
npm run dev
```

App will be available at **http://localhost:5173**.

### Other scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Start Vite dev server with HMR    |
| `npm run build`| Build the production bundle       |
| `npm run preview` | Preview the production build  |
| `npm run lint` | Run ESLint checks                 |

---

## State & API Layer

- **Redux auth slice** (`store/slices/auth.slice.js`) holds the user and token and exposes actions like login/logout.
- **Axios instance** (`api/axios.js`) uses `VITE_API_URL` as the base URL and injects `Authorization: Bearer <token>` from `localStorage` on every request.

---

## Styling & UI

- Tailwind CSS 4 configured through `@tailwindcss/vite`.
- Components follow the **shadcn/ui** style built on headless **Base UI primitives**.
- Uses `class-variance-authority` + `cn` for clean, variant-aware class names.
- Geist Variable font loaded via `@fontsource-variable/geist`.

---

## Security Notes (Frontend)

- Tokens stored in `localStorage` and attached via request interceptor.
- Sensitive pages are wrapped with `ProtectedRoute`; auth pages with `GuestRoute` (redirects logged-in users away from login/register).