# HOTEL MIS MICROSERVICES GENERATION FRAMEWORK PROMPT

You are a senior software architect and full-stack engineer.

Your task is to generate a complete Hotel Management Information System (Hotel MIS) using the exact architectural philosophy of my previously completed Smart Parking Information System.

IMPORTANT:

The goal is FAST DEVELOPMENT FOR EXAMS.

Prioritize:

* simplicity
* readability
* maintainability
* consistency
* predictable architecture
* beginner-friendly code

Avoid:

* DDD
* CQRS
* Event Sourcing
* Kafka
* RabbitMQ
* Complex Clean Architecture
* Hexagonal Architecture
* Overengineering
* Enterprise abstractions

Use straightforward Service → Controller → Route patterns.

---

# SYSTEM OVERVIEW

Develop a Hotel Management Information System using Microservices Architecture.

Architecture style:

* Docker Compose orchestration
* Nginx API Gateway
* Synchronous service-to-service communication
* REST APIs
* JWT Authentication
* Refresh Token Rotation
* Role-Based Access Control (RBAC)

No event-driven architecture.

No message brokers.

---

# TECHNOLOGY STACK

Backend

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Refresh Tokens
* Joi Validation
* Swagger Documentation
* Winston Logging
* pnpm

Frontend

* Vite
* ReactJS (JavaScript only)
* React Router
* Fetch API
* TailwindCSS
* Lucide Icons
* React Hot Toast
* SweetAlert2
* Responsive SPA
* Reusable Components

Infrastructure

* Docker
* Docker Compose
* Nginx Gateway

---

# ROLES

Use shared enums.

Backend:

src/constants/roles.js

Frontend:

src/utils/constants.js

Roles:

ADMIN
RECEPTIONIST
ACCOUNTANT

Example:

export const ROLES = {
ADMIN: 'ADMIN',
RECEPTIONIST: 'RECEPTIONIST',
ACCOUNTANT: 'ACCOUNTANT'
};

---

# BUSINESS MODULES

Authentication

Users

Rooms

Guests

Reservations

Check-ins

Check-outs

Payments

Reports

---

# MICROSERVICES

Create the following services.

hotel-mis/

services/

auth-service/
user-service/
room-service/
reservation-service/
payment-service/
report-service/

gateway/

nginx/

frontend/

docs/

docker-compose.yml

---

# DATABASE DESIGN

AUTH SERVICE

users

{
_id
firstName
lastName
phone
email
password
role
tokenVersion
createdAt
updatedAt
}

---

ROOM SERVICE

rooms

{
_id
roomNumber
roomType
floor
capacity
pricePerNight
status
createdAt
updatedAt
}

Room Status Enum

AVAILABLE
RESERVED
OCCUPIED
MAINTENANCE

---

RESERVATION SERVICE

guests

{
_id
firstName
lastName
phone
email
nationality
idNumber
createdAt
updatedAt
}

reservations

{
_id
guestId
roomId
checkInDate
checkOutDate
numberOfGuests
status
createdAt
updatedAt
}

Reservation Status

PENDING
CONFIRMED
CHECKED_IN
CHECKED_OUT
CANCELLED

---

PAYMENT SERVICE

payments

{
_id
reservationId
amount
paymentMethod
paidAt
createdAt
updatedAt
}

Payment Methods

CASH
CARD
MOMO

---

REPORT SERVICE

Aggregated reporting only.

No dedicated collections required.

Generate:

Occupancy Report
Revenue Report
Reservation Report
Check-In Report

---

# MICROSERVICE STRUCTURE

Every service MUST use the exact same structure.

src/

app.js
server.js

config/
env.js
swagger.js

constants/

controllers/

database/

middlewares/
auth.middleware.js
error.middleware.js
role.middleware.js
validate.middleware.js

models/

routes/

schemas/

services/

swagger/

utils/
ApiError.js
asyncHandler.js
logger.js

---

# AUTHENTICATION DESIGN

Access Token

* short lived
* stored in memory on frontend

Refresh Token

* stored in HTTP-only cookie
* Secure
* SameSite=Lax
* path=/

Implement:

POST /auth/login
POST /auth/register
POST /auth/refresh
POST /auth/logout
GET /auth/me

Use tokenVersion for refresh token invalidation.

---

# SERVICE COMMUNICATION

Use synchronous REST communication.

Examples:

Reservation Service
→ Room Service

to verify room availability

Payment Service
→ Reservation Service

to validate reservation

Report Service
→ Reservation Service
→ Room Service
→ Payment Service

to generate reports

Use Fetch API for internal service communication.

---

# API GATEWAY

Nginx Gateway

Responsibilities:

* Route requests
* Forward headers
* Forward cookies
* Handle CORS
* Centralized entry point

Examples:

/api/auth/*
/api/users/*
/api/rooms/*
/api/reservations/*
/api/payments/*
/api/reports/*

---

# RBAC MATRIX

ADMIN

Full access

RECEPTIONIST

Reservations
Guests
Check-ins
Check-outs
Room Availability

ACCOUNTANT

Payments
Revenue Reports
Reservation Financials

---

# REQUIRED APIs

AUTH

POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET /auth/me

---

USERS

GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

Admin only

---

ROOMS

POST /rooms
GET /rooms
GET /rooms/:id
PUT /rooms/:id
DELETE /rooms/:id

Admin only for mutations

---

GUESTS

POST /guests
GET /guests
GET /guests/:id
PUT /guests/:id

Admin + Receptionist

---

RESERVATIONS

POST /reservations
GET /reservations
GET /reservations/:id
PUT /reservations/:id
DELETE /reservations/:id

Admin + Receptionist

---

CHECK-IN

POST /reservations/:id/check-in

Admin + Receptionist

---

CHECK-OUT

POST /reservations/:id/check-out

Admin + Receptionist

---

PAYMENTS

POST /payments

GET /payments

GET /payments/:id

Admin + Accountant

---

REPORTS

GET /reports/occupancy

GET /reports/revenue

GET /reports/reservations

GET /reports/checkins

Admin + Accountant

---

# SWAGGER

Every service must expose:

/api-docs

Document:

Schemas

Parameters

Responses

Security

Examples

---

# FRONTEND STRUCTURE

frontend/src/

api/

auth.api.js
user.api.js
room.api.js
guest.api.js
reservation.api.js
payment.api.js
report.api.js
http.js

auth/

Login.jsx
Register.jsx

components/

Badge.jsx
Card.jsx
ConfirmDialog.jsx
EmptyState.jsx
FormInput.jsx
Loader.jsx
Modal.jsx
Navbar.jsx
Pagination.jsx
ProtectedRoute.jsx
StatsCard.jsx
Table.jsx

dashboard/

Dashboard.jsx
Sidebar.jsx
Summary.jsx

hooks/

useAuth.js
usePagination.js

layouts/

DashboardLayout.jsx

pages/

DashboardPage.jsx

RoomsPage.jsx
CreateRoomPage.jsx
RoomDetailsPage.jsx

GuestsPage.jsx
GuestDetailsPage.jsx

ReservationsPage.jsx
ReservationDetailsPage.jsx

CheckInPage.jsx
CheckOutPage.jsx

PaymentsPage.jsx

UsersPage.jsx
UserDetailsPage.jsx

ProfilePage.jsx

reports/
RevenueReportPage.jsx
OccupancyReportPage.jsx
ReservationReportPage.jsx
CheckInReportPage.jsx

styles/
tailwind.css

utils/

constants.js
formatCurrency.js
formatDate.js
router.jsx
storage.js

---

# FRONTEND REQUIREMENTS

Use:

React Router

Fetch API

TailwindCSS

Lucide Icons

React Hot Toast

SweetAlert2

Never use:

window.alert
window.confirm

Use:

toast.success()
toast.error()

SweetAlert2 for:

delete confirmation
logout confirmation
critical actions

---

# DASHBOARDS

ADMIN

Total Rooms

Occupied Rooms

Reservations

Revenue

Recent Reservations

Recent Payments

---

RECEPTIONIST

Today's Check-Ins

Today's Check-Outs

Available Rooms

Active Reservations

---

ACCOUNTANT

Today's Revenue

Monthly Revenue

Payments Received

Pending Payments

---

# CODING PRINCIPLES

Generate code exactly following these principles:

* Feature-based organization
* Controller → Service → Model pattern
* Joi validation everywhere
* Reusable middleware
* Reusable UI components
* Minimal abstractions
* No unnecessary classes
* Prefer pure functions
* Consistent naming
* Small files
* Readable code
* Fast implementation suitable for academic projects and practical exams

Generate the project incrementally module-by-module while maintaining consistency across all services and frontend pages.