# Akash Jewellers – Jewellery Store Website

Akash Jewellers is a simple and modern website built for a real jewellery shop located in **Pali, Korba (Chhattisgarh)**.

The website allows:

* Customers to browse jewellery online
* Customers to send enquiries
* Admin to manage jewellery, prices, and messages

This project is built as a **Capstone Project** and focuses on real business use, not just demo features.

---

## Live Website

Visit the website here:

[https://akash-jewellers.vercel.app](https://akash-jewellers.vercel.app)

Anyone can open this link and explore the catalogue.

---

## What Can You Do on This Website?

### For Customers (Public Users)

* View jewellery categories like rings, necklaces, earrings, bangles
* See live gold and silver prices
* Open jewellery detail pages
* Send enquiry messages using the contact form
* Chat directly using WhatsApp button

No login is required for customers.

---

### For Admin

* Login using email and password
* Add, edit, or delete jewellery items
* Update live gold and silver prices
* View customer messages
* Reply to customer enquiries
* Access admin-only dashboard pages

---

## Technology Used (Simple)

* Frontend & Backend: Next.js
* Styling: Tailwind CSS
* Database: PostgreSQL
* ORM: Prisma
* Authentication: JWT (stored in localStorage)
* Email: Nodemailer (SMTP)
* WhatsApp: Twilio
* Hosting: Vercel

---

## Website Pages

### Public Pages

* `/` – Home page
* `/catalogue/[category]` – Jewellery category page
* `/catalogue/item/[id]` – Jewellery detail page
* `/login` – Login page
* `/register` – Register page

---

### Admin Pages (Login Required)

* `/admin/dashboard`
* `/admin/jewellery`
* `/admin/prices`
* `/admin/messages`

---

## How Authentication Works (Very Simple)

1. User registers or logs in
2. Server sends a JWT token
3. Token is stored in **localStorage**
4. Token is sent in API requests using `Authorization` header
5. Admin-only APIs check the user role

No cookies are used.

---

## API Examples (Copy & Paste Ready)

### Register a New User

```bash
curl -X POST https://akash-jewellers.vercel.app/api/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Aman",
  "email": "aman@test.com",
  "password": "12345678"
}'
```

---

### Login

```bash
curl -X POST https://akash-jewellers.vercel.app/api/login \
-H "Content-Type: application/json" \
-d '{
  "email": "aman@test.com",
  "password": "12345678"
}'
```

After login, the token is stored in `localStorage`.

---

### Get Jewellery List (Public)

```bash
curl "https://akash-jewellers.vercel.app/api/jewellery"
```

With filters:

```bash
curl "https://akash-jewellers.vercel.app/api/jewellery?category=rings&search=gold"
```

---

### Add Jewellery (Admin Only)

```bash
curl -X POST https://akash-jewellers.vercel.app/api/jewellery \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Gold Necklace",
  "category": "necklaces",
  "weight": 25,
  "makingCharges": 8000,
  "gst": 3,
  "discount": 2000,
  "image": "https://example.com/image.jpg"
}'
```

---

### Update Live Gold & Silver Prices (Admin)

```bash
curl -X POST https://akash-jewellers.vercel.app/api/livePrices \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "gold": 62000,
  "goldRTGS": 61500,
  "silver": 74000
}'
```

---

### Send Enquiry (Public)

```bash
curl -X POST https://akash-jewellers.vercel.app/api/contact \
-H "Content-Type: application/json" \
-d '{
  "name": "Customer Name",
  "email": "customer@test.com",
  "phone": "+917XXXXXXXXX",
  "message": "I want to know more about bridal necklaces"
}'
```

---

### Reply to Customer (Admin)

```bash
curl -X POST https://akash-jewellers.vercel.app/api/contact/reply \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "id": "<MESSAGE_ID>",
  "email": "customer@test.com",
  "name": "Customer Name",
  "subject": "Re: Jewellery Enquiry",
  "message": "Thank you for contacting Akash Jewellers. We will assist you shortly."
}'
```

---

## Run This Project on Your System

### Step 1: Clone

```bash
git clone <repo-url>
cd akash-jewellers
```

---

### Step 2: Install Packages

```bash
npm install
```

---

### Step 3: Create `.env` File

```
DATABASE_URL=
JWT_SECRET=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Akash Jewellers
ADMIN_EMAIL=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
ADMIN_WHATSAPP_NUMBER=
```

---

### Step 4: Start Project

```bash
npm run dev
```

Open browser at:

```
http://localhost:3000
```

---

## Future Enhancements

* Virtual Jewellery Try-On : Users will be able to virtually try jewellery such as earrings, necklaces, and rings using their camera.
* Image upload using Cloudinary
* Order and billing system
* Analytics dashboard
* Multi-admin roles

