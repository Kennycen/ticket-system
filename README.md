# Ticket Support System

## Overview

This is a simple support ticketing system developed as a take-home project. Users can submit support tickets, and admins can manage, update, and view submitted tickets through an admin dashboard.

The project consists of two parts:

- Frontend built with Next.js and Tailwind CSS
- Backend built with Express.js and MongoDB

## Live Demo

- Frontend (Next.js App): [View Site](https://ticket-system-wine.vercel.app)
- Backend (API Server): [API Server](https://ticket-system-bdn0.onrender.com)

## Features

- Users can submit support tickets by filling out a form
- Admin dashboard displays a list of all submitted tickets
- Admin can filter tickets by status (new, in progress, resolved)
- Admin can update the status of tickets
- Admin can view detailed ticket information and conversation history
- Data is stored and retrieved from MongoDB

## Technologies Used

### Frontend:
- Next.js (App Router)
- Tailwind CSS
- Axios

### Backend:
- Express.js
- MongoDB with Mongoose
- CORS Middleware

## Important Notes

- No email service is implemented as per assignment instruction.
- When an admin adds a response to a ticket, it is logged to the console instead of sending a real email.
- MongoDB Atlas is used for storing ticket data.


