# 🚀 Reward-Based Task App (Gamified + Web3)

A production-style full-stack app that combines **gamification + productivity + Web3 rewards**, powered by **Stellar Soroban smart contracts** and **Freighter wallet integration**.

---

## ✨ Features

- 🧠 Task system with XP, streaks, and levels  
- 🏆 Real-time leaderboard (Socket.IO ready)  
- 🎁 Reward redemption system  
- 💰 Web3 token transfer via Soroban  
- 🔗 Freighter wallet integration  
- ⚡ Fallback UI (works even without backend)  
- 🎨 Smooth modern UI (Next.js + Tailwind + animations)  

---

## 🧠 Architecture

### 🔹 Task Flow
Client → complete task → backend validates → XP + streak updated → leaderboard refreshed  

### 🔹 Web3 Flow
User connects Freighter → signs Soroban transaction → reward/token transfer executed  

### 🔹 Hybrid Mode
- **With backend** → full persistence + auth  
- **Without backend** → fallback demo mode (UI + blockchain still works)

---

## 🛠️ Tech Stack

| Layer        | Tech Used                          |
|-------------|----------------------------------|
| Frontend     | Next.js 14, Tailwind, Framer Motion |
| State Mgmt   | Zustand                          |
| Backend      | Node.js, Express, MongoDB        |
| Realtime     | Socket.IO                        |
| Blockchain   | Stellar Soroban                  |
| Wallet       | Freighter                        |

---

## 🔗 Smart Contract

**Soroban Contract ID:**

```
CDROQKVK2M2AXQTYCVRB55UCMKTZW3RT3ZW2ADXH53GESP3MERPLMOKK
```

---

## 📂 Project Structure

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

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Nightingale2494/Reward-Based-Task-App-Gamified-.git
cd Reward-Based-Task-App-Gamified-
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:3000
```

---

## 🧩 Backend Setup (Optional but recommended)

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Runs on:
```
http://localhost:5000
```

---

## 🔐 Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔌 Key API Routes

- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id/complete`
- `GET /leaderboard`
- `GET /rewards`
- `POST /rewards/claim`

---

## 🌐 UI Pages

- `/dashboard`
- `/tasks`
- `/leaderboard`
- `/rewards`
- `/profile`
- `/login`
- `/register`

---

## 🧪 Demo Credentials

```
nova@example.com / Password123!
sam@example.com / Password123!
kai@example.com / Password123!
```

---

## 💡 How It Works

```
Tasks → XP → Rewards → Token Transfer → Wallet 💸
```

1. Complete tasks → earn XP  
2. Redeem rewards  
3. Connect Freighter wallet  
4. Tokens transferred via Soroban contract  

---

## 🚧 Current Status

- ✅ Frontend fully functional  
- ✅ Backend API ready  
- ✅ Wallet integration working  
- ✅ Soroban contract deployed  
- ✅ Token transfer implemented  
- ⚠️ Auth partially bypassed in demo mode  

---

## 🔮 Future Improvements

- 🔐 Full production auth system  
- 📊 Real-time leaderboard updates  
- 💰 XP → token conversion logic  
- 🔗 On-chain reward tracking  
- 🌍 Deployment (Vercel + backend hosting)  
- ⚡ Performance optimization + caching  

---

## 🧑‍💻 Author

**Nightingale** 🐦‍⬛  
Building towards freedom + money + control 💰

---

## 📜 License

MIT License

---

## ⭐ Support

If you like this project:
- ⭐ Star the repo  
- 🍴 Fork it  
- 🚀 Build something even crazier  
