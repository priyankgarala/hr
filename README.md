# 🧑‍💼 Human Resource Management System (HRMS)

A full-stack Human Resource Management System built to manage employees, attendance, and leave workflows with role-based access control and AI-powered assistance.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (Admin, Manager, Employee)
- Secure login & protected routes

### 👤 User Management (Admin)
- Add employees and managers
- Assign roles and manage user data
- Maintain employee profiles (department, salary, etc.)

### 📅 Attendance System
- Daily **Check-In / Check-Out**
- Automatic **working hours calculation**
- Status detection (Full Day / Half Day)
- Filter attendance by:
  - Day
  - Month
  - Year
- Admin can view all employee records

### 📝 Leave Management
- Employees can apply for leave
- Managers review and approve/reject leave requests
- Multi-level approval system (scalable logic)
- Leave status tracking

### 🧑‍💻 Manager Panel
- View assigned leave requests
- Approve / Reject leaves
- (Future scope: multi-manager approval logic)

### 🤖 AI Chatbot (Gemini API)
- Smart HR assistant
- Answers queries related to:
  - Leaves
  - Policies
  - General HR questions

---

## 🏗️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Others
- JWT Authentication
- REST APIs
- Gemini API (AI Chatbot)


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/hrms.git
cd hrms
cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key

npm run dev

cd client
npm install
npm run dev
