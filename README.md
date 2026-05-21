# 🩺 DocAppoint — Book Top Doctors in Bangladesh

**Live Site:** [https://doc-appoint-client.vercel.app](https://doc-appoint-client.vercel.app)

DocAppoint is a full-stack doctor appointment booking platform built for patients in Bangladesh. It allows users to browse BMDC-verified specialist doctors, book appointments instantly, manage their schedules, and leave reviews — all from a fast, mobile-friendly interface available 24/7.

---

## ✨ Key Features

- 🔍 **Browse & Search Verified Doctors** — Filter specialists by category, availability, and location. Every doctor listed is BMDC-verified before appearing on the platform.
- ⚡ **Instant Appointment Booking** — Confirm a doctor's appointment in under 2 minutes with real-time availability. Manage, reschedule, or cancel bookings from your personal dashboard.
- 🔐 **Secure Authentication** — Email/password and Google OAuth sign-in powered by Better Auth with JWT-based session management. Sessions are stored in **HttpOnly cookies** (not localStorage) to protect against XSS. User data is encrypted and never shared without consent.
- ⭐ **Verified Patient Reviews** — Patients can leave star ratings and written reviews after their appointment. Reviews are stored in MongoDB and displayed in a live **Swiper.js carousel** on the homepage.
- 📱 **Fully Responsive UI** — Optimized for all screen sizes using inline CSS and custom CSS variables. Works seamlessly on mobile, tablet, and desktop.
- 🌗 **Dark / Light Mode** — System-aware theme switching with smooth transitions across the entire interface.
- 📧 **Email Notifications** — Appointment confirmation emails sent via EmailJS integration.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), JavaScript |
| Styling | Tailwind CSS + CSS Variables |
| Auth | Better Auth (Email + Google OAuth, JWT via HttpOnly cookies) |
| Carousel | Swiper.js |
| Backend | Node.js + Express.js (REST API) |
| Database | MongoDB Atlas (via Mongoose) |
| Deployment (Client) | Vercel |
| Deployment (Server) | Render |
| HTTP Client | Axios |
| Notifications | EmailJS |

---

## 🔐 Authentication & Session Details

- **JWT-based sessions** are issued by Better Auth on login.
- Tokens are stored in **HttpOnly cookies** — they are set server-side and are not accessible to JavaScript, protecting against XSS attacks.
- **localStorage and sessionStorage are not used** for any sensitive data.
- Google OAuth 2.0 is supported alongside email/password login.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials
- A running instance of the [DocAppoint Server](https://github.com/fahid2002/DocAppoint-Server)

### Client Setup

```bash
# 1. Clone the repository
git clone https://github.com/fahid2002/DocAppoint-Client.git
cd DocAppoint-Client

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_here
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

```bash
# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/              # Server-side API routes (auth, reviews)
│   ├── dashboard/        # Patient dashboard
│   ├── appointments/     # Appointment management
│   ├── login/            # Auth pages
│   └── register/
├── components/           # Reusable UI components
│   ├── Navbar/
│   ├── Hero/
│   ├── Testimonials/     # Swiper.js review carousel
│   └── ...
├── libs/                 # Axios instance, auth client, helpers
└── types/                # TJavaScript type definitions
```

---

## 🌐 Deployment

### Client — Vercel
1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables in **Settings → Environment Variables**
4. Deploy

### Server — Render
1. Push server code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Add environment variables
4. Deploy

---

## 📋 Legal

### Terms & Conditions
By using DocAppoint, you agree to book appointments in good faith and provide accurate personal information. DocAppoint is a platform that connects patients with verified doctors and is not liable for medical advice or outcomes. Users must not misuse the platform, impersonate others, or attempt unauthorized access to any part of the system.

### Privacy Policy
DocAppoint collects only the information necessary to provide its services — including your name, email address, and appointment details. Your data is encrypted, stored securely in MongoDB Atlas, and is never sold or shared with third parties without your explicit consent. Authentication sessions use HttpOnly cookies and JWT tokens. You may request deletion of your account and data at any time by contacting us.

---

## 📄 License

This project is built for educational purposes. No commercial license is granted.

---

© 2026 DocAppoint — Designed & developed by **Fahid Hasan Khan**. All rights reserved.
