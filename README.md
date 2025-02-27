# 🚀 LinkTree/Bento.me Clone with Referral System

A full-stack **MERN** project that replicates **LinkTree/Bento.me**, allowing users to **create referral links, track referrals**, and manage their accounts securely.

---

## 📌 Features

✅ User Registration & Login (**JWT Authentication**)
✅ Referral System (**Track total & successful referrals**)
✅ Password Reset via Email
✅ Secure API with **Role-Based Authentication**
✅ **Unit & Integration Testing** (Jest & Supertest)
✅ Hosted API with **MongoDB Atlas**

---

## 📂 Project Structure

```
backend/  
├── models/          # MongoDB Models  
│   ├── User.js  
│   ├── Referral.js  
│  
├── routes/          # API Routes  
│   ├── auth.js  
│   ├── referral.js  
│   ├── protected.js  
│  
├── controllers/     # Business Logic  
│   ├── authController.js  
│   ├── referralController.js  
│  
├── middlewares/     # Authentication Middleware  
│   ├── authMiddleware.js  
│  
├── tests/           # Jest & Supertest Tests  
│   ├── auth.test.js  
│   ├── referral.test.js  
│   ├── user.test.js  
│  
├── config/          # Database & Env Config  
│   ├── db.js  
│  
├── server.js        # Main Express Server  
└── .env             # Environment Variables  
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ Start the Server

```bash
npm start
```

> **Server will run at:** `http://localhost:8000`

---

## 🚀 API Endpoints

### 📝 Authentication

| Method | Endpoint                 | Description            | Auth Required |
|--------|--------------------------|------------------------|--------------|
| `POST` | `/api/auth/register`     | Register User          | ❌ No        |
| `POST` | `/api/auth/login`        | Login User & Get Token | ❌ No        |
| `POST` | `/api/auth/forgot-password` | Send Reset Email  | ❌ No        |
| `POST` | `/api/auth/reset-password`  | Reset Password   | ❌ No        |

### 🔗 Referral System

| Method | Endpoint                     | Description                   | Auth Required |
|--------|------------------------------|-------------------------------|--------------|
| `GET`  | `/api/referrals`             | Get Referrals                 | ✅ Yes       |
| `GET`  | `/api/referrals/stats`       | Get Referral Statistics       | ✅ Yes       |

### 🔒 Protected Routes

| Method | Endpoint                      | Description                    | Auth Required |
|--------|------------------------------|--------------------------------|--------------|
| `GET`  | `/api/protected/dashboard`   | Get Dashboard Data             | ✅ Yes       |

---

## 🧪 Running Tests

### 1️⃣ Run Unit & Integration Tests

```bash
node test.js
```
---

## 🌍 Deployment Guide

### 🚀 Deploy to Render (Easiest)

1. Push your code to **GitHub**
2. Create a free account on **[Render](https://render.com/)**
3. Click **"New Web Service"** → Connect your GitHub Repo
4. Set **Start Command**:
   ```bash
   npm start
   ```
5. Add **Environment Variables** from `.env` file
6. Click **"Deploy"** → Get your **API URL** 🎉

---

## 📸 Screenshots

| Login Page | Dashboard |
|------------|----------|
| ![Login](https://via.placeholder.com/400) | ![Dashboard](https://via.placeholder.com/400) |

---



