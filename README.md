# 🌴 Travel.lk - Modern Sri Lankan Travel Platform

> **Discover the Pearl of the Indian Ocean.** A full-stack travel booking platform built with Next.js 15, Prisma, and Shadcn UI.

![Project Banner](https://images.unsplash.com/photo-1588258524675-c637c3588975?q=80&w=2000&auto=format&fit=crop)

## 🚀 Overview

**Travel.lk** is a comprehensive travel agency management system designed to streamline bookings, package management, and customer inquiries. It features a stunning public-facing portal for travelers and a robust admin dashboard for agency staff.

### ✨ Key Features

- **🌍 Dynamic Booking Engine**: Browse, search, and book curated travel packages.
- **🛡️ Role-Based Authentication**: Secure access with NextAuth v5 (Admin, Super Admin, User).
- **🎨 Modern Aesthetic**: Beautifully crafted UI using **Shadcn UI** & **Tailwind CSS**.
- **⚙️ Integrated CMS**: Manage site content (Hero banners, Featured destinations) directly from the Admin Panel.
- **📊 Admin Dashboard**: Real-time analytics for bookings, revenue, and user growth.
- **📱 Fully Responsive**: Optimized experience across mobile, tablet, and desktop.
- **⚡ High Performance**: Built on Next.js 15 (App Router) for blazing fast server-side rendering.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [MySQL](https://www.mysql.com/) (via TiDB/PlanetScale)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth v5 (Auth.js)](https://authjs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/travel-lk.git
cd travel-lk
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="mysql://user:password@host:port/database"
AUTH_SECRET="your-super-secret-key" # Generate with `npx auth secret`
```

### 4. Setup Database

Push the schema to your database and seed initial data (Super Admin & Config).

```bash
npx prisma db push
npx prisma db seed
```

> **Note:** The seed script creates a default Super Admin account:
> - **Email**: `admin@travel.lk`
> - **Password**: `password123`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```bash
├── 📁 prisma           # Database schema & seed scripts
├── 📁 public           # Static assets
├── 📁 src
│   ├── 📁 app          # Next.js App Router (Pages & API)
│   │   ├── 📁 (admin)  # Protected Admin Routes
│   │   ├── 📁 (auth)   # Login/Signup Pages
│   │   └── 📁 api      # API Routes (Auth, etc.)
│   ├── 📁 components   # Reusable UI Components
│   │   ├── 📁 admin    # Admin-specific components
│   │   ├── 📁 public   # Public-facing components
│   │   └── 📁 ui       # Shadcn UI primitives
│   ├── 📁 lib          # Utilities (DB connection, helpers)
│   └── 📁 types        # TypeScript definitions
└── 📄 middleware.ts    # Edge Middleware for Route Protection
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
