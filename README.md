# Akash Jewellers – Smart Jewellery Store Management System

A modern jewellery website built for my family shop (Akash Jewellers, Pali–Korba).  
Customers can browse collections & send enquiries, while admins can manage jewellery and messages.

**Live Link:** https://akash-jewellers.vercel.app


## Features

### Authentication
- JWT Login / Signup  
- Admin-only access to dashboard  

### Jewellery Catalogue
- Categories  
- Search, Sort, Filter  
- Pagination  
- Product cards  

### Admin Panel
- Add / Edit / Delete jewellery  
- View all items  
- Manage contact messages  
- Reply, archive & delete enquiries  

### Contact Form
- Sends email to admin  
- Sends confirmation email to customer  
- WhatsApp alert (Twilio)

---

## Tech Stack

- **Frontend:** Next.js 14, React, TailwindCSS  
- **Backend:** Next.js API Routes  
- **Database:** PostgreSQL (Prisma ORM)  
- **Auth:** JWT  
- **Emails:** Resend  
- **WhatsApp Alerts:** Twilio  
- **Hosting:** Vercel + NeonDB  

---

## API Overview (CRUD Covered)

### Jewellery
- `GET /api/jewellery` – list (pagination + filters)  
- `POST /api/jewellery` – create  
- `PUT /api/jewellery/:id` – update  
- `DELETE /api/jewellery/:id` – delete  

### Contact Messages
- `POST /api/contact` – create  
- `GET /api/contact` – admin read  
- `PATCH /api/contact/:id` – reply/archive (update)  
- `DELETE /api/contact/:id` – delete  

### Auth
- `POST /api/register`  
- `POST /api/login`  
- `GET /api/me`  

---

## How to Run Locally

```bash
npm install
npm run dev
