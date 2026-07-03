# 🚀 Smart Job Tracker

A full-stack Job Application Tracking System that helps job seekers organize their job search efficiently by tracking applications, managing resumes, monitoring interview schedules, and analyzing job search progress through an interactive dashboard.

---

## 📌 Project Purpose

Job seekers often apply to dozens or even hundreds of jobs across multiple platforms like LinkedIn, Indeed, and Naukri. Managing applications manually using spreadsheets becomes difficult and time-consuming.

**Smart Job Tracker** provides a centralized platform where users can:

- Search and organize job opportunities
- Save interesting jobs
- Track application status
- Manage interview schedules
- Upload resumes
- Receive interview reminders via email
- Visualize application statistics through analytics

The goal is to simplify the job search process while demonstrating production-ready full-stack development practices.

---

# 📷 Screenshots

> Add screenshots after deployment.

- Login Page
- Dashboard
- Job Listings
- Applied Jobs
- Saved Jobs
- Analytics
- Resume Manager
- Interview Reminders

---

# ✨ Features

## Authentication

- JWT Authentication
- Secure Login
- User Registration
- Protected Routes
- Password Hashing using bcrypt

---

## Dashboard

- Modern SaaS UI
- Dashboard Statistics
- Search Jobs
- Filter Jobs
- Sort Jobs
- Pagination
- Responsive Design

---

## Job Management

- Browse available jobs
- Save jobs
- Remove saved jobs
- Apply to jobs
- View original job posting

---

## Application Tracking

Track every application with:

- Applied
- Interview
- Offer
- Rejected

Users can update:

- Interview Date
- Personal Notes
- Recruiter Information
- Salary Offered

---

## Resume Manager

- Upload Resume (PDF)
- View Uploaded Resume
- Delete Resume
- One Resume Per User

---

## Interview Management

Upcoming Interview Dashboard

Automatically displays:

- Company
- Job Role
- Interview Date
- Upcoming Schedule

---

## Email Reminder System

Background Cron Job automatically sends interview reminders before scheduled interviews.

---

## Analytics Dashboard

Displays:

- Total Applications
- Interviews
- Offers
- Rejections
- Success Rate
- Offer Percentage

---

## Security Features

- JWT Authentication
- Route Protection
- Password Encryption
- Express Rate Limiter
- Input Validation
- Secure File Upload

---

# 🏗️ System Architecture

Frontend

React

↓

Axios

↓

Express REST API

↓

Controllers

↓

MySQL Database

↓

Email Service + Cron Jobs

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- React Icons

---

## Backend

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- Multer
- Nodemailer
- Node-Cron

---

## Database

MySQL

---

## Development Tools

- VS Code
- Git
- GitHub
- Postman

---

# 📂 Project Structure

```
smart-job-tracker

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── api/
│   └── App.jsx
│
└── package.json

backend/
│
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── cron/
├── uploads/
└── server.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/smart-job-tracker.git
```

---

## Backend

```bash
cd backend

npm install

npm start
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Backend `.env`

```
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=smart_job_tracker

JWT_SECRET=your_secret

EMAIL_USER=your_gmail

EMAIL_PASS=your_app_password
```

---

# 📡 REST API

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Jobs

```
GET /api/jobs
```

---

## Saved Jobs

```
GET /api/saved-jobs

POST /api/saved-jobs/:id

DELETE /api/saved-jobs/:id
```

---

## Applied Jobs

```
GET /api/applied-jobs

POST /api/applied-jobs/:id

PUT /api/applied-jobs/:id

DELETE /api/applied-jobs/:id
```

---

## Analytics

```
GET /api/analytics
```

---

## Resume

```
POST /api/resume/upload

GET /api/resume

DELETE /api/resume
```

---

## Interviews

```
GET /api/interviews/upcoming
```

---

# 📈 Future Enhancements

- AI Resume Analysis
- AI Job Recommendation
- Company Review Integration
- Salary Prediction
- Calendar Integration
- Email Templates
- Multi Resume Support
- Interview Preparation Notes
- OAuth Login (Google)

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- REST API Development
- JWT Authentication
- MySQL Database Design
- File Upload Handling
- Email Automation
- Background Cron Jobs
- React Hooks
- State Management
- Pagination
- Filtering & Sorting
- Secure Backend Development
- Responsive UI Design
- Full Stack Application Architecture

---

# 👩‍💻 Author

**Srivalli R**

Aspiring Java Full Stack Developer

Focused on building scalable full-stack applications using Java, Spring Boot, React, SQL, and modern web technologies.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
