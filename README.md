# ApplyAI

AI-powered Job Application & Interview Tracker built with Next.js, TypeScript, MongoDB, Prisma, and AI SDK.

## Overview

ApplyAI is a full-stack web application designed to help job seekers manage their job search from a single workspace.

It allows users to:

- Track job applications
- Manage application statuses
- Schedule and manage interviews
- View job search analytics
- Analyze job descriptions using AI
- Generate AI-powered interview preparation
- Secure their account with authentication and authorization

The project is designed as a production-oriented application rather than a basic CRUD or task-management application.

## Live Demo

**Live Application:** Add your Render URL here

**GitHub Repository:** Add your GitHub repository URL here

## Features

### Authentication

- User registration
- Secure login
- Password hashing with bcrypt
- JWT-based sessions using NextAuth
- Protected dashboard routes
- Logout functionality
- Authenticated users are redirected away from login/signup pages

### Job Application Management

- Create applications
- View applications
- Update application information
- Delete applications
- Track application status
- Store job URL, location, salary, job type, notes, deadline, and resume information
- User ownership checks prevent access to another user's applications

### Application Status Tracking

Supported statuses:

- Applied
- Screening
- Interview
- Offer
- Rejected
- Withdrawn

### Dashboard & Analytics

- Total applications
- Total interviews
- Offers
- Response rate
- Application status breakdown
- Recent applications
- Upcoming interviews

### Interview Management

- Create interviews
- View interviews
- Update interviews
- Delete interviews
- Schedule interview date and time
- Store interviewer information
- Store meeting URLs
- Track interview results
- Add interview notes
- Display upcoming interviews on the dashboard

### AI Job Description Analysis

ApplyAI uses an LLM to analyze job descriptions and provide:

- Match score
- Job description summary
- Strengths
- Missing skills
- Recommendations

### AI Interview Preparation

Users can generate interview preparation based on:

- Job title
- Company
- Interview round

The AI generates:

- Preparation overview
- Technical questions
- Behavioral questions
- Answer points
- Topics to revise
- Preparation tips

### Security & Validation

- Zod input validation
- Server-side validation
- Authentication checks
- Authorization and ownership checks
- Password hashing
- AI request rate limiting
- Input length limits
- Protected dashboard routes
- Secure environment variables
- Custom error handling
- Custom 404 page

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| Frontend | React |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Authentication | NextAuth |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Database | MongoDB Atlas |
| ORM | Prisma |
| AI | Vercel AI SDK + Groq |
| Testing | Vitest |
| Version Control | Git + GitHub |
| CI | GitHub Actions |
| Deployment | Render |

## Architecture

```text
ApplyAI
│
├── Landing Page
├── Authentication
│   ├── Signup
│   ├── Login
│   ├── Logout
│   └── Protected Routes
└── Dashboard
    ├── Overview
    ├── Applications
    │   ├── Create
    │   ├── Read
    │   ├── Update
    │   └── Delete
    ├── Interviews
    │   ├── Create
    │   ├── Read
    │   ├── Update
    │   └── Delete
    ├── AI Tools
    │   ├── Job Description Analysis
    │   └── Interview Preparation
    └── Settings
```

## Database Architecture

```text
User
 │
 └── Application
      │
      ├── Interview
      └── AIAnalysis
```

### User

- Name
- Email
- Password hash
- Account timestamps

### Application

- Company
- Job title
- Job URL
- Location
- Salary
- Job type
- Application status
- Applied date
- Deadline
- Notes
- Resume used

### Interview

- Interview round
- Scheduled date/time
- Interviewer
- Meeting URL
- Result
- Notes

### AIAnalysis

- Match score
- Summary
- Strengths
- Missing skills
- Recommendations

## Authentication Flow

```text
User
 │
 ├── Signup
 │      ↓
 │   Validate Input
 │      ↓
 │   Hash Password
 │      ↓
 │   Create User
 │
 └── Login
        ↓
     Credentials
        ↓
     Verify Password
        ↓
     Create Session
        ↓
     Dashboard
```

Protected routes:

```text
/dashboard/*
```

Unauthenticated users are redirected to `/login`.

Authenticated users attempting to access `/login` or `/signup` are redirected to `/dashboard`.

## AI Architecture

### Job Description Analysis

```text
Job Description
       ↓
Input Validation
       ↓
Authentication
       ↓
Application Ownership Check
       ↓
Groq / LLM
       ↓
Structured Output
       ↓
Zod Validation
       ↓
Analysis Result
```

### Interview Preparation

```text
Application
     ↓
Interview Round
     ↓
Authentication
     ↓
Ownership Check
     ↓
LLM
     ↓
Structured Output
     ↓
Interview Preparation
```

AI requests are rate-limited to reduce abuse and unnecessary API usage.

## Validation Flow

```text
User Input
    ↓
Server Action
    ↓
Zod Validation
    ↓
Authentication
    ↓
Authorization / Ownership Check
    ↓
Database Operation
```

All important inputs are validated on the server.

## Testing

The project uses Vitest for automated validation testing.

### Application Tests

- Valid application
- Empty company validation
- Invalid job URL
- Excessively long notes
- Supported job types

### Interview Tests

- Valid interview
- Missing application
- Empty interview round
- Invalid meeting URL
- Invalid interview result

### AI Tests

- Valid AI analysis
- Match score above 100
- Negative match score
- Empty summary
- Excessive recommendations

### Current Test Status

- Test Files: **3 passed**
- Tests: **15 passed**
- TypeScript Check: **Passed**

## CI/CD

GitHub Actions runs automatically on pushes and pull requests targeting the `main` branch.

```text
Git Push / Pull Request
          ↓
   GitHub Actions
          ↓
       npm ci
          ↓
 TypeScript Check
          ↓
      Vitest
          ↓
   Next.js Build
          ↓
        PASS
```

CI checks:

- Dependency installation
- TypeScript validation
- Automated tests
- Production build

## Deployment

The application is deployed on Render.

```text
Developer
    ↓
Git Push
    ↓
GitHub
    ↓
GitHub Actions
    ↓
Quality Checks
    ↓
Render
    ↓
Production Deployment
```

MongoDB Atlas is used as the production database.

Production secrets are configured through Render environment variables and are not committed to the repository.

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="your-groq-api-key"
```

For production, configure these variables in Render.

Never commit `.env` or `.env.local` files containing secrets.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd applyai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` and add:

```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="your-groq-api-key"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Sync database schema

```bash
npx prisma db push
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npx tsc --noEmit` | Run TypeScript validation |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Sync Prisma schema with MongoDB |

## Project Structure

```text
applyai/
├── .github/
│   └── workflows/
│       └── ci.yml
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   │   ├── ai/
│   │   │   ├── applications/
│   │   │   ├── interviews/
│   │   │   └── settings/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── actions/
│   │   ├── validations/
│   │   ├── auth.ts
│   │   ├── ai.ts
│   │   ├── prisma.ts
│   │   └── rate-limit.ts
│   ├── middleware.ts
│   └── types/
├── tests/
│   └── validations/
├── package.json
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
└── README.md
```

## Development Progress

### Foundation

- [x] Initialize Next.js project
- [x] Configure TypeScript
- [x] Configure Tailwind CSS
- [x] Configure shadcn/ui
- [x] Build landing page
- [x] Build dashboard foundation

### Database

- [x] Set up MongoDB Atlas
- [x] Configure Prisma ORM
- [x] Design database schema
- [x] Configure Prisma Client
- [x] Connect application to database
- [x] Add database health check

### Authentication

- [x] User signup
- [x] User login
- [x] Password hashing
- [x] Protected dashboard routes
- [x] Logout
- [x] Authenticated-user redirects

### Applications

- [x] Create application
- [x] Read applications
- [x] Update application backend
- [x] Delete application
- [x] Application validation
- [x] Application status tracking
- [x] Ownership authorization

### Dashboard

- [x] Application statistics
- [x] Status breakdown
- [x] Recent applications
- [x] Upcoming interviews

### Interviews

- [x] Create interview
- [x] Read interviews
- [x] Update interviews
- [x] Delete interviews
- [x] Interview validation
- [x] Interview result tracking
- [x] Upcoming interview display

### AI

- [x] AI job description analysis
- [x] Match score generation
- [x] Missing skills analysis
- [x] AI recommendations
- [x] AI interview preparation
- [x] Technical interview questions
- [x] Behavioral interview questions
- [x] Preparation topics
- [x] Preparation tips
- [x] AI request rate limiting

### Security & Reliability

- [x] Zod validation
- [x] Server-side authorization
- [x] Ownership checks
- [x] Password hashing
- [x] Protected routes
- [x] Rate limiting
- [x] Error boundary
- [x] Loading states
- [x] Custom 404 page

### Testing

- [x] Configure Vitest
- [x] Application validation tests
- [x] Interview validation tests
- [x] AI validation tests
- [x] TypeScript checks
- [x] 15 automated tests passing

### CI/CD

- [x] Configure GitHub Actions
- [x] TypeScript check in CI
- [x] Automated tests in CI
- [x] Production build in CI
- [x] Render deployment
- [x] Automatic deployment from GitHub

## Current Status

🚀 **Deployed and under active development.**

Core workflow:

```text
Signup
  ↓
Login
  ↓
Dashboard
  ↓
Applications
  ↓
Interviews
  ↓
AI Tools
  ├── Job Description Analysis
  └── Interview Preparation
```

## Future Improvements

- [ ] Application edit UI refinement
- [ ] Advanced dashboard charts
- [ ] Search and filtering
- [ ] Pagination for large application lists
- [ ] AI analysis history
- [ ] Resume upload and parsing
- [ ] Resume-to-job matching
- [ ] Interview practice mode
- [ ] More comprehensive E2E testing
- [ ] Distributed rate limiting
- [ ] Performance monitoring
- [ ] Additional accessibility improvements
- [ ] Next.js middleware-to-proxy migration

## Author

**Yash Walke**

- GitHub: https://github.com/yaaryash
- LinkedIn: www.linkedin.com/in/yaaryash

## License

This project was built as a full-stack engineering assignment and portfolio project.
