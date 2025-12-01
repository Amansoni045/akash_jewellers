# Akash Jewellers – Smart Jewellery Store Management System

A modern jewellery website built for my family shop **Akash Jewellers (Pali, Korba)**.  
Customers can browse collections and send enquiries, while admins can manage jewellery items and reply to messages.

### 🔗 Live Project  
**https://akash-jewellers.vercel.app**

---

## ⭐ Features

### 🔐 Authentication
- JWT-based Login & Signup  
- Role-based access (Admin / User)

### 💎 Jewellery Catalogue
- Category-wise browsing (Necklaces, Rings, Earrings, Bangles)
- Search, Sort, Filter  
- Pagination  
- Product Details Page  

### 🛠 Admin Panel
- Add Jewellery  
- Edit Jewellery  
- Delete Jewellery  
- Manage customer messages  
- Reply to messages (email sent automatically)

### 📩 Contact System
- Customers submit enquiries  
- Admin receives email + WhatsApp alert  
- Customer receives auto-reply email  
- Admin can reply to enquiries

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, TailwindCSS |
| Backend | Next.js API Routes (Serverless Functions) |
| ORM | Prisma.io (Schema + Migrations + Client) |
| Database | PostgreSQL (NeonDB Cloud) |
| Auth | JWT |
| Emails | Resend |
| WhatsApp Alerts | Twilio |
| Hosting | Vercel (Frontend + Backend), NeonDB (Database) |

---

## 📁 Folder Structure (Important for Evaluation)

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
├── prisma/schema.prisma
└── public (images)
```

---

## 🔌 API Endpoints (CRUD Requirements Covered)

### **Jewellery (CRUD Fully Implemented)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jewellery` | List items (search + sort + pagination + category filter) |
| POST | `/api/jewellery` | Create new item |
| PUT | `/api/jewellery/:id` | Update item |
| DELETE | `/api/jewellery/:id` | Delete item |

### **Contact Messages**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit enquiry |
| GET | `/api/contact` | Admin read messages |
| PATCH | `/api/contact/:id` | Reply to message (email sent) |
| DELETE | `/api/contact/:id` | Delete message |

### **Auth**
| Method | Endpoint |
|--------|----------|
| POST | `/api/register` |
| POST | `/api/login` |
| GET | `/api/me` |

✔ Satisfies **minimum 2 Create, 2 Read, 2 Update, 2 Delete** requirement.

---

## 🧪 How to Run Locally

```bash
npm install
npm run dev
```

Create a `.env` file with:

```
DATABASE_URL=
JWT_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
ADMIN_EMAIL=
ADMIN_WHATSAPP_NUMBER=
```

---

## 📌 Proposal (As Required in README)

### **Problem Statement**
Local jewellery shops still use offline methods for inventory & customer management.  
This project digitizes Akash Jewellers, enabling:

- Online catalogue  
- Customer enquiries  
- Admin inventory management  
- Automated communication  

### **Goal**
Bring traditional jewellery business online with a modern, mobile-first system.

---

## 🎤 Evaluation Preparation (1:1 Round Ready)

### **Past Experience**
- Web developer (React, Next.js)
- Multiple personal projects

### **Tech Strengths**
- React, Next.js, Tailwind  
- Node.js, Prisma  
- JWT auth  
- API design  

### **Biggest Challenge**
Handling email + WhatsApp integration → solved using Resend + Twilio + async API patch routes.

---

## ✔ Final Notes
This project fully satisfies:

- Backend CRUD  
- Search, Sort, Pagination  
- Hosting verification  
- Documentation requirement  
- Problem statement matching  
- Authentication  
- Admin roles  
- Live deployed link  

```

---

# 🎉 **Your README is now PERFECT for college evaluation.**  
Short, clean, professional, and EXACTLY matching your project.

If you want, I can also create:

🔥 A PDF summary  
🔥 A presentation slide deck  
🔥 A short project explanation script for viva  

Just tell me!
