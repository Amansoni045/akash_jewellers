# Akash Jewellers – Smart Jewellery Store Management System

A modern, mobile-first jewellery platform built for Akash Jewellers (Pali, Korba) to digitalize product showcasing, customer communication, and backend inventory management.

This project is submitted as my Capstone Project at Newton School of Technology.

---

## Live Project Link

Frontend (Hosted on Vercel):
[https://akash-jewellers.vercel.app](https://akash-jewellers.vercel.app)

---

# 1. Project Title

Akash Jewellers – Smart Jewellery Store Management System

---

# 2. Problem Statement

Most local jewellery shops operate offline, which creates limitations:

* No digital catalogue
* Limited customer reach
* Manual inventory management
* Inefficient customer communication
* No automated enquiry handling

This project solves these problems by providing:

* Online jewellery catalogue
* Admin inventory management (CRUD)
* Customer enquiry system
* Auto email responses
* WhatsApp notifications
* Admin message reply system
* Mobile-first responsive UI

---

# 3. System Architecture

```
Frontend (Next.js 14 – App Router)
↓
Backend (Next.js Route Handlers / API Routes)
↓
Database (Prisma ORM + PostgreSQL hosted on Prisma Data Platform)
```

Hosting:

* Frontend + Backend: Vercel
* Database: Prisma Data Platform (PostgreSQL)

---

# 4. Key Features

Authentication

* JWT login and signup
* Admin-only dashboard access

Jewellery Catalogue

* Category-based browsing
* Search, sort, filter
* Pagination
* Product detail page

Admin Panel

* Add jewellery (Create)
* View all jewellery (Read)
* Edit jewellery (Update)
* Delete jewellery (Delete)
* View customer messages
* Reply to messages

Contact System

* Customer enquiries
* Auto email to customer
* Email + WhatsApp alert to admin
* Admin can reply to messages

Responsive Design

* Fully responsive
* Designed for mobile-first

---

# 5. Tech Stack

| Layer           | Technology                        |
| --------------- | --------------------------------- |
| Frontend        | Next.js 14, React, TailwindCSS    |
| Backend         | Next.js Route Handlers            |
| ORM             | Prisma ORM                        |
| Database        | PostgreSQL (Prisma Data Platform) |
| Authentication  | JWT                               |
| Email Service   | Resend                            |
| WhatsApp Alerts | Twilio                            |
| Hosting         | Vercel                            |

---

# 6. Folder Structure

```
├── app
│   ├── admin
│   │   ├── messages/page.jsx
│   │   └── page.jsx
│   ├── api
│   │   ├── contact
│   │   │   ├── [id]/route.js
│   │   │   └── route.js
│   │   ├── jewellery
│   │   │   ├── [id]/route.js
│   │   │   └── route.js
│   │   ├── login/route.js
│   │   ├── me/route.js
│   │   └── register/route.js
│   ├── catalogue
│   │   ├── [category]/page.jsx
│   │   └── item/[id]/page.jsx
│   ├── components (Navbar, Hero, About, Catalogue, Contact, Footer)
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── prisma
│   └── schema.prisma
└── public (images)
```

---

# 7. CRUD API Endpoints (With Copy-Paste Examples)

Below are endpoints evaluators can test directly.

---

## Authentication APIs

Register User

```
curl -X POST https://akash-jewellers.vercel.app/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Aman","email":"aman@test.com","password":"12345678"}'
```

Login

```
curl -X POST https://akash-jewellers.vercel.app/api/login \
-H "Content-Type: application/json" \
-d '{"email":"aman@test.com","password":"12345678"}'
```

---

## Jewellery CRUD (Admin Only)

Create Jewellery

```
curl -X POST https://akash-jewellers.vercel.app/api/jewellery \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"name":"Gold Ring","category":"rings","price":15000,"weight":5,"image":"/rings.jpg"}'
```

Read Jewellery with search/filter/sort

```
curl "https://akash-jewellers.vercel.app/api/jewellery?search=ring&sort=price_desc"
```

Update Jewellery

```
curl -X PUT https://akash-jewellers.vercel.app/api/jewellery/<ID> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"name":"Updated Ring","category":"rings","price":12000}'
```

Delete Jewellery

```
curl -X DELETE https://akash-jewellers.vercel.app/api/jewellery/<ID> \
-H "Authorization: Bearer <TOKEN>"
```

---

## Contact & Enquiries

Submit Contact Form

```
curl -X POST https://akash-jewellers.vercel.app/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Ravi","email":"customer@test.com","phone":"9999999999","message":"Need bridal ring"}'
```

Get All Messages (Admin)

```
curl -H "Authorization: Bearer <TOKEN>" \
https://akash-jewellers.vercel.app/api/contact
```

Reply to Message

```
curl -X PATCH https://akash-jewellers.vercel.app/api/contact/<ID> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"action":"reply","replyText":"Thanks for contacting Akash Jewellers"}'
```

Delete Message

```
curl -X DELETE https://akash-jewellers.vercel.app/api/contact/<ID> \
-H "Authorization: Bearer <TOKEN>"
```

---

# 8. How to Run Locally

Clone repository

```
git clone <repo-url>
cd akash-jewellers
```

Install dependencies

```
npm install
```

Environment variables (.env)

```
DATABASE_URL=your_prisma_accelerate_database_url
JWT_SECRET=your_secret
RESEND_API_KEY=your_resend_key
EMAIL_FROM=your_email
ADMIN_EMAIL=your_email
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+91XXXXXXXXXX
```

Run development server

```
npm run dev
```

