# 📈 StocKing – Stock Market Prediction App

A modern stock market tracking and prediction web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This app allows users to search for stock symbols, view real-time price data, and analyze recent trends using historical data.

---

## 🚀 Features

- 🔍 Search stocks by symbol (e.g., AAPL, TSLA)
- 📊 Real-time stock price data
- 📉 Historical price visualization (last 30 days)
- ⚡ Optimized API routes with caching
- 🔐 Authentication support (via Clerk)
- 🎨 Clean UI using Tailwind CSS + shadcn/ui
- 🎬 Smooth animations with Framer Motion
- 📱 Fully responsive design

---

## 🧱 Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend / API
- Next.js API Routes
- Finnhub Stock API

### Auth
- Clerk Authentication

---

## 📁 Project Structure
app/
│
├── api/
│ └── stock/[symbol]/route.ts # API route for fetching stock data
│
├── components/ # Reusable UI components
│ ├── Navbar.tsx
│ ├── Footer.tsx
│ └── DropdownMenu.tsx
│
├── dashboard/ # Main dashboard page
├── about/ # About page
├── layout.tsx # Root layout
├── page.tsx # Home page
│
public/ # Static assets

---


👨‍💻 Author
Developed by Rohan Chaulagain
