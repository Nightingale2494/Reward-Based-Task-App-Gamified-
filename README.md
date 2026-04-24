# Reward-Based Task App (Gamified + Web3)

Production-ready monorepo with:
- `frontend/` → Next.js + Tailwind + Framer Motion + Zustand + Recharts
- `backend/` → Node.js + Express + MongoDB + Mongoose + JWT + Socket.IO
- `contracts/` → Soroban smart contract for on-chain points/reward claims (Freighter-compatible)

## Architecture

- **Task completion flow**: Client marks task complete → backend validates → points + level + streak updated → badge checks → websocket leaderboard refresh.
- **Web3 flow**: User connects Freighter wallet on frontend, then can sign Soroban transactions for on-chain reward logic.
- **Scalability**: MVC backend structure, services layer for gamification logic, reusable UI components and Zustand stores on frontend.

## Folder Structure

```bash
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
frontend/
  app/
  components/
  hooks/
  lib/
  store/
contracts/
  soroban/
  scripts/
```

## 1) Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### Key APIs
- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id/complete`
- `GET /leaderboard`
- `GET /rewards`
- `POST /rewards/claim`

## 2) Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

### UI Pages
- `/dashboard`
- `/tasks`
- `/leaderboard`
- `/rewards`
- `/profile`
- `/login`
- `/register`

## 3) Soroban Contract Setup

Prerequisites:
- Rust + `wasm32-unknown-unknown` target
- Soroban CLI
- Freighter wallet extension

```bash
cd contracts/soroban
cargo build --target wasm32-unknown-unknown --release
```

Deploy example:

```bash
cd contracts
./scripts/deploy.sh
```

## Freighter + Soroban Integration Notes

- Frontend Freighter integration helper: `frontend/lib/freighter.js`
- Wallet connection currently updates user session with wallet address.
- You can extend rewards flow to call Soroban `claim_reward` and persist tx hash on backend.

## Demo Seed Credentials

- `nova@example.com / Password123!`
- `sam@example.com / Password123!`
- `kai@example.com / Password123!`

## Production Hardening Checklist

- Add request validation (e.g., Zod/Joi)
- Add rate limiting + helmet + audit logging
- Use Redis for leaderboard cache + distributed websocket adapter
- Add e2e tests and CI pipelines
- Persist auth in secure HTTP-only cookies if desired
- Add PWA manifest/service worker

## Windows / OneDrive Dev Warning Fix

If you see this warning while running `npm run dev`:

`PackFileCacheStrategy ... ENOENT ... rename ... .next\\cache\\webpack`

it is usually caused by OneDrive file sync/locking around Next.js filesystem cache writes.
This repo is configured to use **memory webpack cache in dev mode** to avoid this issue.

If you still see it:
- Pause OneDrive sync while developing
- Or move the project out of OneDrive-managed folders
- Clear `.next/` and restart dev server
