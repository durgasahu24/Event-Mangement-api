```markdown
# 🎟️ Event Management API

A **RESTful Event Management API** built with **Node.js**, **Express.js**, and **PostgreSQL**.  
This project allows users to create events, register for them, cancel registrations, and view event statistics — following clean MVC architecture and business rules.

---

## 🚀 Features

### 👤 Users
- Create a new user  
- Fetch user details by ID

### 🎉 Events
- Create a new event  
- Get event details (with registered users)  
- Register or cancel user registration  
- Get all upcoming events  
- View event statistics (total registrations, remaining capacity, percentage used)

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| ORM/Driver | `pg` (node-postgres) |
| Environment | `dotenv` |
| Dev Tool | `nodemon` |

---

## 📂 Folder Structure

```

Event-Mangement-api/
│
├── index.js                # Main server file
├── db.js                   # PostgreSQL connection
├── .env                    # Environment variables
│
├── models/                 # Database queries
│   ├── user.model.js
│   ├── event.model.js
│   └── registration.models.js
│
├── controllers/            # Business logic
│   ├── user.controller.js
│   └── event.controller.js
│
├── routes/                 # Express routes
│   ├── user.routes.js
│   └── event.routes.js
│
└── package.json

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/durgasahu24/Event-Mangement-api.git
cd Event-Mangement-api
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root folder and add:

```env
PORT=8000
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=event_management
```

> 💡 Make sure PostgreSQL is running locally and you’ve created a database named `event_management`.

### 4️⃣ Start the Server

```bash
npm run dev
```

or

```bash
node index.js
```

---

## 🧱 Database Setup (PostgreSQL)

1. Open **pgAdmin** or terminal.
2. Create database:

   ```sql
   CREATE DATABASE event_management;
   ```
3. The models automatically create the required tables:

   * `users`
   * `events`
   * `registrations`

---

## 🧩 API Endpoints

### 👤 **Users**

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| `POST` | `/api/users`     | Create new user |
| `GET`  | `/api/users/:id` | Get user by ID  |

### 🎉 **Events**

| Method | Endpoint                    | Description                               |
| ------ | --------------------------- | ----------------------------------------- |
| `POST` | `/api/events`               | Create a new event                        |
| `GET`  | `/api/events/:id`           | Get event details (with registered users) |
| `POST` | `/api/events/register`      | Register a user for an event              |
| `POST` | `/api/events/cancel`        | Cancel user registration                  |
| `GET`  | `/api/events/upcoming/list` | List upcoming events                      |
| `GET`  | `/api/events/stats/:id`     | Get event statistics                      |

---

## 🧠 Business Logic Rules

✅ Capacity validation (`1–1000`)
✅ Prevent duplicate registrations
✅ Disallow registration for past events
✅ Enforce event capacity limits
✅ Return proper HTTP status codes and error messages

---

## 🧰 Example Request (Create Event)

```json
POST /api/events
{
  "title": "Tech Conference 2025",
  "date": "2025-11-20T10:00:00Z",
  "location": "Indore",
  "capacity": 500
}
```

**Response:**

```json
{
  "message": "New event created successfully",
  "eventId": 1
}
```

---

## 🧪 Example Request (Register User)

```json
POST /api/events/register
{
  "userId": 1,
  "eventId": 2
}
```

**Response:**

```json
{
  "message": "Event registered successfully"
}
```

---

## 🧮 Example Stats Response

```json
GET /api/events/stats/1
{
  "totalRegs": 120,
  "remaining": 380,
  "percentageUsed": "24.00%"
}
```

---

## ⚡ Scripts

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `npm start`   | Start app normally                      |
| `npm run dev` | Start app in development mode (nodemon) |

---
