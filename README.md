# 🚀 NestJS Cron Job Service

A **NestJS-based backend service** for managing and executing scheduled cron jobs with **MongoDB, Webhooks, and Rate Limiting**.

## 📌 Features
✅ **CRUD Operations** for Cron Jobs  
✅ **Scheduled Execution** using NestJS Scheduler  
✅ **Webhook Support** for external API calls  
✅ **Execution History Tracking** in MongoDB  
✅ **API Rate Limiting** using `@nestjs/throttler`  
✅ **Global Error Handling** with Exception Filters  
✅ **Unit Testing** using Jest  

---

## ⚙️ **Installation & Setup**

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root folder if not exists:
```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cronjobs
PORT=3000
```

### **4️⃣ Start the Application**
```bash
npm run start
```
The server will start at `http://localhost:3000`.

---

## 📡 **API Endpoints**
### **1️⃣ Cron Job Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/cron-jobs` | Create a new cron job |
| **GET** | `/cron-jobs` | Get all cron jobs |
| **GET** | `/cron-jobs/:id` | Get a single cron job |
| **PUT** | `/cron-jobs/:id` | Update a cron job |
| **DELETE** | `/cron-jobs/:id` | Delete a cron job |

#### **Example: Create a Cron Job**
**Request:**
```json
{
  "name": "Daily Report",
  "triggerUrl": "https://jsonplaceholder.typicode.com/todos/1",
  "apiKey": "123456",
  "schedule": "daily",
  "startDate": "2025-02-10T10:00:00.000Z"
}
```
**Response:**
```json
{
  "_id": "65c9aefb5d12a8",
  "name": "Daily Report",
  "schedule": "daily",
  "triggerUrl": "https://jsonplaceholder.typicode.com/todos/1",
  "createdAt": "2025-02-10T10:00:00.000Z"
}
```

---

### **2️⃣ Webhook Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/webhooks` | Receive external webhook data |
| **GET** | `/webhooks` | Fetch all received webhooks |

#### **Example: Send a Webhook**
**Request (POST `/webhooks`)**
```json
{
  "event": "user.created",
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
**Response:**
```json
{
  "_id": "67a8303d89881bcfc885e858",
  "data": {
    "event": "user.created",
    "user": {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "receivedAt": "2025-02-09T04:34:05.238Z"
}
```

---

### **3️⃣ Execution History Tracking**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/cron-jobs/:id/history` | Get execution logs for a cron job |

---

## 🛡️ **Security & Rate Limiting**
- **Global Rate Limit**: `10 requests per minute per IP`
- **Webhook Rate Limit**: `3 requests per 30 seconds per IP`
- Configured using `@nestjs/throttler`

---

## 🐛 **Error Handling**
This project uses **global exception handling** via `HttpExceptionFilter`.  
Example error response:
```json
{
  "statusCode": 400,
  "message": "Invalid request data",
  "timestamp": "2025-02-09T12:00:00.000Z"
}
```

---

## ✅ **Testing**
Run unit tests using Jest:
```bash
npm test
```

Expected output:
```
PASS  src/cron_jobs/cron-jobs.service.spec.ts
PASS  src/app.controller.spec.ts
```

🎯 Removal of Testing Cron Job Method

🔹 Removed the Method that Runs Cron Jobs Every Minute

Previously, the service had a method that executed cron jobs every minute for testing purposes. This method was located at:

File: src/cron_jobs/cron_jobs.service.ts

Line: 55

This method has now been removed to ensure that cron jobs only run as per their defined schedule.


## 🎯 **Conclusion**
This NestJS Cron Job Service provides a **scalable, efficient, and secure** way to manage and execute scheduled tasks with logging, webhooks, and history tracking. 🚀

