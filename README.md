# Real-Time Chat Application

This is a real-time chat application built with Next.js, Pusher, and Clerk.

## Screenshots
![image](https://github.com/user-attachments/assets/2abfcd55-b132-4f49-a26b-02adc98993b8)
![image](https://github.com/user-attachments/assets/032d0e0d-adf9-4418-bfa5-b586ddd69d6a)
![image](https://github.com/user-attachments/assets/f17285e1-4371-4574-a72d-c1732ae38b1f)



## Features

- Real-time messaging
- User authentication
- Modern, responsive UI

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Pusher](https://pusher.com/) - Real-time functionality
- [Clerk](https://clerk.dev/) - User authentication
- [TypeScript](https://www.typescriptlang.org/) - Type checking

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Pusher account
- Clerk account

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Suraj370/neochat.git
cd neochat
```

Install dependencies:
```bash
npm install
# or
yarn install
```
Setup environment variables
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sign-in
CLERK_WEBHOOK_SECRET = 

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 

NEXT_PUBLIC_PUSHER_APP_KEY = 
PUSHER_APP_ID = 
PUSHER_SECRET = 

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=""
```
Open http://localhost:3000 in your browser to see the application.

## Deployment
This application can be easily deployed on platforms like Vercel or Netlify. Make sure to set up the environment variables in your deployment platform's settings.
My deployment 
https://suraj-neochat.netlify.app/
