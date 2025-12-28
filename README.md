# Akash Jewellers – Smart Jewellery Store Management System

A full-stack, production-ready jewellery management platform built for Akash Jewellers (Pali, Korba) to digitalize catalogue browsing, customer enquiries, and admin operations.

This project is developed and submitted as my Capstone Project at Newton School of Technology.

---

## Live Project

Frontend + Backend (Vercel)
[https://akash-jewellers.vercel.app](https://akash-jewellers.vercel.app)

---

## Project Overview

Local jewellery shops traditionally rely on offline operations, which limits growth and efficiency.
This project bridges that gap by providing a modern digital platform that supports:

* Online jewellery catalogue
* Admin-controlled inventory management
* Automated customer enquiries
* Email and WhatsApp notifications
* Secure role-based access
* Mobile-first responsive design

The system is designed around real business workflows, not just basic CRUD functionality.

---

## Problem Statement

Most local jewellery stores face challenges such as:

* No digital product catalogue
* Limited customer reach
* Manual inventory handling
* Inefficient enquiry follow-ups
* No centralized customer communication

### Solution

This platform provides:

* Online jewellery catalogue with filters and search
* Admin dashboard for inventory management
* Customer enquiry system with automated responses
* Email notifications using Resend
* WhatsApp alerts using Twilio
* Secure JWT-based authentication

---

## System Architecture

```
Client (Next.js 14 – App Router)
        ↓
API Layer (Next.js Route Handlers)
        ↓
Database (Prisma ORM + PostgreSQL)
```

### Hosting and Infrastructure

* Frontend and Backend: Vercel
* Database: PostgreSQL (Prisma Data Platform)
* Media: Cloudinary (image upload ready)

---

## Key Features

### Authentication and Authorization

* JWT-based login and registration
* Role-based access control
* Admin-only route protection

### Jewellery Catalogue

* Category-based browsing
* Search, sort and filter support
* Pagination
* Dedicated product detail pages

### Admin Dashboard

* Create, read, update and delete jewellery items
* View and manage customer enquiries
* Reply to customer messages from the admin panel
* Secure admin-only access

### Customer Enquiry System

* Contact form for customers
* Automated confirmation email to customer
* Email and WhatsApp alert to admin
* Admin reply workflow

### Responsive Design

* Mobile-first layout
* Optimized for real customer usage
* Smooth UI animations

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | Next.js 14, React, Tailwind CSS   |
| Backend        | Next.js Route Handlers            |
| ORM            | Prisma ORM                        |
| Database       | PostgreSQL (Prisma Data Platform) |
| Authentication | JWT                               |
| Email Service  | Resend                            |
| WhatsApp       | Twilio                            |
| Hosting        | Vercel                            |

---

## Folder Structure (Simplified)

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
│   │   ├── register/route.js
│   │   └── me/route.js
│   ├── catalogue
│   │   ├── [category]/page.jsx
│   │   └── item/[id]/page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components
├── prisma
│   └── schema.prisma
└── public
```

---

## API Endpoints

### Authentication

Register

```bash
curl -X POST https://akash-jewellers.vercel.app/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Aman","email":"aman@test.com","password":"12345678"}'
```

Login

```bash
curl -X POST https://akash-jewellers.vercel.app/api/login \
-H "Content-Type: application/json" \
-d '{"email":"aman@test.com","password":"12345678"}'
```

---

### Jewellery Management (Admin Only)

Create

```bash
curl -X POST https://akash-jewellers.vercel.app/api/jewellery \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"name":"Gold Ring","category":"rings","price":15000}'
```

Read (Search, Filter, Sort)

```bash
curl "https://akash-jewellers.vercel.app/api/jewellery?search=ring&sort=price_desc"
```

Update

```bash
curl -X PUT https://akash-jewellers.vercel.app/api/jewellery/<ID> \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"name":"Updated Ring","price":12000}'
```

Delete

```bash
curl -X DELETE https://akash-jewellers.vercel.app/api/jewellery/<ID> \
-H "Authorization: Bearer <TOKEN>"
```

---

### Contact and Enquiries

Submit Enquiry

```bash
curl -X POST https://akash-jewellers.vercel.app/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Ravi","email":"customer@test.com","message":"Need bridal ring"}'
```

Get All Messages (Admin)

```bash
curl https://akash-jewellers.vercel.app/api/contact \
-H "Authorization: Bearer <TOKEN>"
```

Reply to Message

```bash
curl -X PATCH https://akash-jewellers.vercel.app/api/contact/<ID> \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"replyText":"Thanks for contacting Akash Jewellers"}'
```

---

## Run Locally

Clone the repository

```bash
git clone <repo-url>
cd akash-jewellers
```

Install dependencies

```bash
npm install
```

Create `.env` file

```
DATABASE_URL=
JWT_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_EMAIL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
ADMIN_WHATSAPP_NUMBER=
```

Start the development server

```bash
npm run dev
```

---

## Future Enhancements

* Middleware-based authentication and authorization
* live price integration
* Analytics dashboard
* Multi-store SaaS-ready architecture

---

