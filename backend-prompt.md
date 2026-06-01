# HOTEL MIS BACKEND GENERATION PROMPT

You are a senior backend engineer.

Generate a complete Hotel Management Information System backend using Microservices Architecture.

The objective is:

* Fast development
* Academic projects
* Practical exams
* Maintainable code
* Consistent architecture

Avoid:

* DDD
* CQRS
* Event Sourcing
* Kafka
* RabbitMQ
* Hexagonal Architecture
* Overengineering

Use simple:

Route → Controller → Service → Model

architecture.

---

# TECH STACK

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose
* Joi
* JWT
* Winston
* Swagger
* pnpm
* Docker
* Docker Compose
* Nginx Gateway

---

# ARCHITECTURE

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

docs/

docker-compose.yml

---

# STANDARD SERVICE STRUCTURE

Every microservice MUST follow:

src/

app.js
server.js

config/
env.js
swagger.js

constants/

controllers/

database/
mongodb.js

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

# ROLES

ADMIN

RECEPTIONIST

ACCOUNTANT

Create shared role constants.

---

# AUTHENTICATION

Access Token

* JWT
* short-lived

Refresh Token

* HTTP-only cookie
* SameSite=Strict
* Secure

Implement:

POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET /auth/me

Use tokenVersion invalidation strategy.

---

# DATABASE MODELS

USERS

{
firstName,
lastName,
phone,
email,
password,
role,
tokenVersion
}

ROOMS

{
roomNumber,
roomType,
floor,
capacity,
pricePerNight,
status
}

ROOM STATUS

AVAILABLE
RESERVED
OCCUPIED
MAINTENANCE

GUESTS

{
firstName,
lastName,
phone,
email,
nationality,
idNumber
}

RESERVATIONS

{
guestId,
roomId,
checkInDate,
checkOutDate,
numberOfGuests,
status
}

RESERVATION STATUS

PENDING
CONFIRMED
CHECKED_IN
CHECKED_OUT
CANCELLED

PAYMENTS

{
reservationId,
amount,
paymentMethod,
paidAt
}

PAYMENT METHODS

CASH
CARD
MOMO

---

# SERVICE COMMUNICATION

Use synchronous REST calls only.

Examples:

Reservation Service
→ Room Service

Payment Service
→ Reservation Service

Report Service
→ Reservation Service
→ Room Service
→ Payment Service

Use Fetch API.

No messaging systems.

---

# API GATEWAY

Use Nginx.

Expose:

/api/auth
/api/users
/api/rooms
/api/guests
/api/reservations
/api/payments
/api/reports

Responsibilities:

* routing
* cors
* cookies
* headers

---

# RBAC

ADMIN

Full access

RECEPTIONIST

Guests
Reservations
Check-ins
Check-outs
Room availability

ACCOUNTANT

Payments
Revenue reports

---

# REQUIRED APIS

AUTH

POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET /auth/me

USERS

GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

ROOMS

POST /rooms
GET /rooms
GET /rooms/:id
PUT /rooms/:id
DELETE /rooms/:id

GUESTS

POST /guests
GET /guests
GET /guests/:id
PUT /guests/:id

RESERVATIONS

POST /reservations
GET /reservations
GET /reservations/:id
PUT /reservations/:id
DELETE /reservations/:id

CHECK-IN

POST /reservations/:id/check-in

CHECK-OUT

POST /reservations/:id/check-out

PAYMENTS

POST /payments
GET /payments
GET /payments/:id

REPORTS

GET /reports/occupancy
GET /reports/revenue
GET /reports/reservations
GET /reports/checkins

---

# SWAGGER

Every service exposes:

/api-docs

Document:

* schemas
* parameters
* examples
* security
* responses

---

# CODING PRINCIPLES

* Simple architecture
* Joi validation
* Reusable middleware
* Small files
* Service layer pattern
* Consistent naming
* Production-ready
* Exam-friendly
* No overengineering
