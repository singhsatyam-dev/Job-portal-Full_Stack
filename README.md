# 🚀 CareerForge - AI Powered Job Portal

CareerForge is a full-stack MERN Job Portal designed to bridge the gap between **Job Seekers** and **Recruiters** through a modern hiring platform. The application simplifies job discovery, application management, and candidate screening while integrating an **AI-powered ATS Resume Scorer** to help applicants improve their chances of getting shortlisted.

The platform replicates real-world recruitment workflows by allowing recruiters to post jobs, manage applicants, and evaluate candidates, while helping job seekers discover opportunities and optimize their resumes using AI.

---

## 🌟 Live Demo

### Frontend

https://job-portal-full-stack-jade.vercel.app/

### Backend API

https://job-portal-career-forge.onrender.com/

---

# 📸 Screenshots

## 🏠 Landing Page

<img width="1472" height="956" alt="Landing Page" src="https://github.com/user-attachments/assets/9fdce1e2-a468-48ec-9de4-f52d2c981df7" />

Modern landing page introducing CareerForge and its core features.

---

## 🔐 Authentication

<img width="1478" height="862" alt="Signup" src="https://github.com/user-attachments/assets/14e8427f-270a-4d9d-b22e-dea4527a6efd" />
<img width="1189" height="840" alt="Login" src="https://github.com/user-attachments/assets/5c7537d6-072b-4061-b08a-3e4b08704301" />



Secure login and registration system with role-based access control.

---

## 💼 Job Listings

<img width="100%" alt="Job Listings" src="./screenshots/jobs-page.png" />

Browse and search available jobs with an intuitive user experience.

---

## 📄 Job Details Page

<img width="1652" height="934" alt="image" src="https://github.com/user-attachments/assets/30d103a9-749c-4725-8072-42bbbd3cb917" />


View complete job information and apply directly.

---

## 🤖 AI ATS Resume Scanner

<img width="1093" height="976" alt="Ats Scorer" src="https://github.com/user-attachments/assets/c2b190b0-4672-4851-9678-2b043a70f446" />


Analyze resumes against job descriptions and receive AI-generated ATS scores.

---

## 🏢 Recruiter Dashboard

<img width="1652" height="934" alt="image" src="https://github.com/user-attachments/assets/0ba54967-3fd4-4c17-8749-f05b59b37564" />


Manage job postings, applicants, and recruitment workflows.

---

## 👥 Apply For Job

<img width="1647" height="959" alt="image" src="https://github.com/user-attachments/assets/47442133-013a-4bdd-be0b-26c96bef8179" />


Apply for jobs by adding name, email and uploading resume.

---

# ✨ Features

## 👨‍💼 Job Seeker Features

* User Registration & Login
* Secure Authentication
* Browse Available Jobs
* Search Jobs by Keywords
* View Detailed Job Descriptions
* Apply for Jobs
* Resume Upload
* AI ATS Resume Analysis
* ATS Score Generation
* Resume Improvement Suggestions

---

## 🏢 Recruiter Features

* Recruiter Registration & Login
* Create New Job Listings
* Edit Existing Jobs
* Delete Jobs
* View Posted Jobs
* Manage Applicants
* Track Candidate Applications
* Recruiter Dashboard

---

## 🤖 AI ATS Resume Scanner

The AI Resume Scanner helps candidates understand how Applicant Tracking Systems evaluate resumes.

### Capabilities

* Resume Parsing
* ATS Compatibility Analysis
* Resume Scoring
* Missing Keyword Detection
* Personalized Resume Suggestions
* Job Description Matching

This helps applicants improve their resumes before submitting applications.

---

# 🎯 Problem Statement

The hiring process often creates challenges for both job seekers and recruiters.

### Problems Faced by Job Seekers

* Difficulty finding relevant job opportunities
* Lack of visibility into ATS screening systems
* Resume rejections without feedback
* Poor understanding of resume optimization

### Problems Faced by Recruiters

* Large volumes of applications
* Time-consuming candidate screening
* Difficulty identifying qualified candidates quickly
* Inefficient application management

---

# 💡 Solution

CareerForge addresses these challenges through:

* Centralized Job Discovery
* Recruiter Job Management
* AI-Powered Resume Analysis
* Application Tracking
* Faster Candidate Screening
* Resume Optimization Insights
* Secure Role-Based Access Control

The result is a smoother and more efficient hiring experience for both recruiters and job seekers.

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT Authentication
* Role-Based Authorization

## AI Integration

* Google Gemini API
* PDF Parsing

## Deployment

* Vercel
* Render

---

# 🚧 Challenges Faced During Development

## 1. AI Integration

Integrating Google Gemini API for ATS analysis required prompt engineering and structured JSON output handling to ensure meaningful resume evaluations.

## 2. Resume PDF Parsing

Extracting clean and usable text from uploaded PDF resumes while maintaining accuracy for AI processing was challenging.

## 3. Role-Based Authentication

Building separate workflows for recruiters and job seekers while maintaining secure route protection required careful backend architecture.

## 4. Search & Pagination

Implementing efficient job search and pagination to support large datasets and improve performance.

## 5. Secure Authorization

Protecting recruiter-specific actions such as creating, updating, and deleting jobs from unauthorized users.

## 6. Frontend-Backend Integration

Managing API communication, environment variables, deployment configurations, and CORS policies.

## 7. State Management

Handling authentication, jobs, user profiles, and applications efficiently across the application.

---

# 📈 Future Improvements

* Resume Builder
* Cloudinary Resume Storage
* Email Notifications
* Real-Time Chat System
* AI Job Recommendations
* AI Interview Preparation Assistant
* Recruiter Analytics Dashboard
* Saved Jobs Feature
* Company Profiles
* Interview Scheduling System

---

# 🧠 Key Learnings

This project helped me gain practical experience in:

* Full Stack MERN Development
* REST API Development
* Authentication & Authorization
* MongoDB Database Design
* AI Integration
* Resume Parsing
* Deployment & Production Configuration
* State Management
* Scalable Software Architecture

---

# ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/CareerForge.git
cd CareerForge
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# 🌟 Why CareerForge Stands Out

✅ Full Stack MERN Application

✅ AI-Powered ATS Resume Scoring

✅ Role-Based Authentication

✅ Recruiter & Job Seeker Workflows

✅ Real-World Hiring Process Simulation

✅ Responsive Modern UI

✅ Production Deployment

---

# 👨‍💻 Author

### Satyam Kumar Singh

Aspiring Full Stack Developer passionate about building scalable web applications and solving real-world problems using modern technologies.

### Connect With Me

* LinkedIn: https://www.linkedin.com/in/satyam-kumar-singh-25087b291/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B2d6CRtwwSua8VPp1UJyd3w%3D%3D

---

