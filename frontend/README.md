mart Job Tracker

An full-stack job aggregation and tracking platform built with React, Node.js, Express, MySQL, Puppeteer, and JWT Authentication.

The system automatically scrapes jobs from online job boards, stores them in a database, provides powerful search and filtering capabilities, and allows users to save jobs for later review.

Features:

Authentication
User Registration
User Login
JWT Authentication
Protected Routes
Logout Functionality
Job Aggregation
Automated Job Scraping using Puppeteer
Scheduled Scraping with Node-Cron
Store Jobs in MySQL
Duplicate Prevention
Job Search
Keyword Search
Location Filtering
Source Filtering
Sorting (Latest, Oldest, Company)
Pagination
Saved Jobs
Save Jobs
View Saved Jobs
Duplicate Save Prevention
Performance
API Response Caching using Node-Cache
Rate Limiting
Validation Middleware
Error Handling Middleware
Request Logging Middleware
Frontend
React
React Router
Axios API Integration
Responsive Dashboard
Tailwind CSS UI
Backend
Node.js
Express.js
MySQL
JWT Authentication
REST API Architecture
Tech Stack
Frontend
React
React Router DOM
Axios
Tailwind CSS
Backend
Node.js
Express.js
JWT
Bcrypt
Express Validator
Express Rate Limit
Node Cache
Database
MySQL
Automation
Puppeteer
Node-Cron
Project Structure

smart-job-tracker/

frontend/

src/
components/
pages/
api/
App.jsx

backend/

controllers/
routes/
middleware/
validators/
config/
cron/
scrapers/
server.js
API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

Jobs

GET /api/jobs

POST /api/jobs/save/

GET /api/jobs/saved

Installation
Clone Repository

git clone https://github.com/YOUR_USERNAME/smart-job-tracker.git

cd smart-job-tracker

Backend Setup

cd backend

npm install

Create a .env file:

PORT=5000

JWT_SECRET=your_secret

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=smart_job_tracker

Start Backend:

npm start

Frontend Setup

cd frontend

npm install

npm run dev

This project demonstrates:

Full-Stack Development
Authentication & Authorization
REST API Design
Web Scraping
Database Design
Middleware Architecture
Performance Optimization
Scheduled Background Jobs
Secure API Development
Deployment Preparation
Author

Srivalli R

Java | React | Node.js | SQL | Full Stack Development
