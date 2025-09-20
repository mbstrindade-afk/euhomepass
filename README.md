# HomePass Next.js Project

This is a [Next.js](https://nextjs.org) project for HomePass with authentication features.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication System

This project includes a complete authentication system with the following features:

- **Frontend**:
  - Login page (`/login`)
  - Registration page (`/register`)
  - Protected dashboard (`/dashboard`)
  - Authentication state management with React Context
  - Token storage in localStorage

- **Backend**:
  - User registration endpoint (`/api/auth/register`)
  - User login endpoint (`/api/auth/login`)
  - Authentication verification endpoint (`/api/auth/me`)
  - Protected dashboard data endpoint (`/api/dashboard`)
  - JWT-based authentication
  - Password encryption with bcrypt
  - SQLite database for user storage

## Project Structure

- `/app` - Next.js App Router pages and layouts
  - `/(auth-routes)` - Authentication pages (login, register)
  - `/(protected-routes)` - Protected pages requiring authentication
  - `/api` - API routes for authentication and protected data
- `/contexts` - React contexts for state management
  - `AuthContext.tsx` - Authentication state management
- `/components` - Reusable React components
- `/lib` - Utility functions and modules
  - `db.ts` - Database connection and user repository
  - `jwt.ts` - JWT token generation and verification
- `/data` - SQLite database storage

## Environment Variables

Create a `.env.local` file with the following variables:

```
JWT_SECRET=your_strong_secret_key_for_homepass_authentication
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
