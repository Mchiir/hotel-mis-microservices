# HOTEL MIS MICROSERVICES - MASTER GENERATION PROMPT

You are a senior full-stack engineer.

Generate a Hotel Management Information System (Hotel MIS) using the same philosophy as a simple academic Smart Parking System.

## Goal

Build quickly for exams while maintaining:

* Simplicity
* Consistency
* Readability
* Maintainability
* Predictable structure

Avoid:

* DDD
* CQRS
* Event Sourcing
* Kafka
* RabbitMQ
* Hexagonal Architecture
* Overengineering

Use straightforward:

Route → Controller → Service → Model

---

## Tech Stack

### Backend

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose
* Joi
* JWT
* Refresh Tokens
* Swagger
* Winston
* pnpm

### Frontend

* React (Vite)
* React Router
* Fetch API
* TailwindCSS
* Lucide Icons
* React Hot Toast
* SweetAlert2

### Infrastructure

* Docker
* Docker Compose
* Nginx API Gateway

---

## Architecture

hotel-mis/

services/

* auth-service
* user-service
* room-service
* reservation-service
* payment-service
* report-service

gateway/
frontend/
docs/
docker-compose.yml

Use synchronous REST communication only.

No message brokers.

---

## Standard Backend Structure

Every microservice must use:

src/

* app.js
* server.js

config/
constants/
controllers/
database/
middlewares/
models/
routes/
schemas/
services/
swagger/
utils/

Utilities:

* ApiError.js
* asyncHandler.js
* logger.js

---

## Authentication

JWT Authentication

Access Token:

* Short-lived
* Stored in frontend memory

Refresh Token:

* HTTP-only cookie
* Secure
* SameSite=Lax
* Refresh token rotation
* tokenVersion invalidation

Endpoints:

* POST /auth/register
* POST /auth/login
* POST /auth/refresh
* POST /auth/logout
* GET /auth/me

---

## Roles

ADMIN
RECEPTIONIST
ACCOUNTANT

Shared constants must be used in both frontend and backend.

RBAC:

ADMIN

* Full access

RECEPTIONIST

* Guests
* Reservations
* Check-ins
* Check-outs
* Room availability

ACCOUNTANT

* Payments
* Financial reports

---

## Core Modules

1. Authentication
2. Users
3. Rooms
4. Guests
5. Reservations
6. Check-ins
7. Check-outs
8. Payments
9. Reports

---

## Main Entities

### User

* firstName
* lastName
* phone
* email
* password
* role
* tokenVersion

### Room

* roomNumber
* roomType
* floor
* capacity
* pricePerNight
* status

Status:

* AVAILABLE
* RESERVED
* OCCUPIED
* MAINTENANCE

### Guest

* firstName
* lastName
* phone
* email
* nationality
* idNumber

### Reservation

* guestId
* roomId
* checkInDate
* checkOutDate
* numberOfGuests
* status

Status:

* PENDING
* CONFIRMED
* CHECKED_IN
* CHECKED_OUT
* CANCELLED

### Payment

* reservationId
* amount
* paymentMethod
* paidAt

Methods:

* CASH
* CARD
* MOMO

---

## Service Communication

Reservation Service
→ Room Service

Validate room availability.

Payment Service
→ Reservation Service

Validate reservation.

Report Service
→ Reservation Service
→ Room Service
→ Payment Service

Generate reports.

Use Fetch API for internal service requests.

---

## Nginx Gateway

Responsibilities:

* Routing
* Header forwarding
* Cookie forwarding
* CORS
* Single API entry point

Routes:

* /api/auth/*
* /api/users/*
* /api/rooms/*
* /api/reservations/*
* /api/payments/*
* /api/reports/*

---

## API Standards

Every resource must support:

* Create
* List
* Get By Id
* Update
* Delete

Use:

* Joi validation
* Consistent response format
* Global error handling
* Async handlers
* RBAC middleware

---

## Reports

Generate:

* Occupancy Report
* Revenue Report
* Reservation Report
* Check-In Report

Report service aggregates data from other services.

---

## Swagger

Every service exposes:

/api-docs

Document:

* Schemas
* Parameters
* Responses
* Security
* Examples

---

## Frontend Principles

Use:

* React Router
* Fetch API
* TailwindCSS
* Reusable components

Reusable components:

* Modal
* Table
* FormInput
* ConfirmDialog
* Badge
* Loader
* Card
* Pagination
* ProtectedRoute

Notifications:

* toast.success()
* toast.error()

Confirmations:

* SweetAlert2

Never use:

* window.alert
* window.confirm

---

## Dashboards

ADMIN

* Total Rooms
* Occupied Rooms
* Reservations
* Revenue

RECEPTIONIST

* Today's Check-Ins
* Today's Check-Outs
* Available Rooms
* Active Reservations

ACCOUNTANT

* Today's Revenue
* Monthly Revenue
* Payments Received

---

## Coding Rules

* Feature-based organization
* Controller → Service → Model pattern
* Small files
* Reusable middleware
* Reusable UI components
* Functional approach
* Consistent naming
* Minimal abstractions
* Exam-friendly implementation

Generate the system incrementally, one service/module at a time, while preserving architectural consistency across all services and the frontend.