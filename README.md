# Hotel MIS Microservices

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?logo=mongodb\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker\&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Gateway-009639?logo=nginx\&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

A Hotel Management Information System (MIS) built using a simple microservices architecture for academic projects, practical exams, and learning distributed systems fundamentals.

---

## Features

* JWT Authentication
* Refresh Token Rotation
* Role-Based Access Control (RBAC)
* Room Management
* Guest Management
* Reservation Management
* Check-In / Check-Out
* Payment Processing
* Occupancy Reports
* Revenue Reports
* Reservation Reports
* Swagger API Documentation
* Nginx API Gateway
* Dockerized Services

---

## Architecture

The system follows a lightweight microservices architecture designed for simplicity, maintainability, and exam-oriented development.

### Microservices

* Auth Service
* User Service
* Room Service
* Reservation Service
* Payment Service
* Report Service

### Infrastructure

* Nginx API Gateway
* Docker Compose
* MongoDB

### Frontend

* React + Vite SPA

All services communicate synchronously through REST APIs.

---

## Tech Stack

### Backend

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose
* Joi Validation
* JWT Authentication
* Winston Logging
* Swagger Documentation
* pnpm

### Frontend

* React
* Vite
* React Router
* TailwindCSS
* Fetch API
* React Hot Toast
* SweetAlert2
* Lucide Icons

### Infrastructure

* Docker
* Docker Compose
* Nginx API Gateway

---

## Project Structure

```text
hotel-mis/

docs/
frontend/
gateway/

services/
├── auth-service/
├── user-service/
├── room-service/
├── reservation-service/
├── payment-service/
└── report-service/

docker-compose.yml
```

---

## Documentation

Comprehensive project documentation is available inside:

```text
/docs
```

### Available Documentation

| File            | Description                                        |
| --------------- | -------------------------------------------------- |
| architecture.md | System architecture diagrams                       |
| system-flow.md  | Reservation, payment, check-in and check-out flows |
| database.md     | ER diagrams and entity relationships               |
| hotel-mis.dbml  | Source-of-truth database schema                    |

### Visual References

* Architecture Diagram
* Service Communication Flow
* Reservation Lifecycle Flow
* Database ER Diagram
* DBML Schema Definition

These documents provide a complete overview of the system design and implementation.

---

## Running the Backend

Build and start all services:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

Stop all services:

```bash
docker compose down
```

Stop services and remove volumes:

```bash
docker compose down -v
```

Rebuild containers:

```bash
docker compose build --no-cache
```

View logs:

```bash
docker compose logs -f
```

View specific service logs:

```bash
docker compose logs -f gateway
docker compose logs -f auth-service
docker compose logs -f reservation-service
```

---

## Running the Frontend

```bash
cd frontend

pnpm install

pnpm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Gateway URL:

```text
http://localhost:8080
```

---

## API Gateway Routes

```text
/api/auth/*
/api/users/*
/api/rooms/*
/api/reservations/*
/api/payments/*
/api/reports/*
```

The Nginx Gateway acts as the single entry point for all backend services.

---

## User Roles

### ADMIN

* Full system access
* User management
* Room management
* Reservations
* Payments
* Reports

### RECEPTIONIST

* Guest management
* Reservations
* Check-ins
* Check-outs
* Room availability

### ACCOUNTANT

* Payment management
* Revenue reports
* Financial reporting

---

## API Documentation

Every microservice exposes Swagger documentation.

Examples:

```text
http://localhost:3001/api-docs
http://localhost:3002/api-docs
http://localhost:3003/api-docs
http://localhost:3004/api-docs
http://localhost:3005/api-docs
http://localhost:3006/api-docs
```

---

## Development Principles

* Feature-Based Structure
* Controller → Service → Model Pattern
* Joi Validation
* Reusable Middleware
* Reusable React Components
* Global Error Handling
* Consistent Response Structure
* Minimal Abstractions
* Functional Programming Approach
* Exam-Friendly Design

---

## Learning Objectives

This project demonstrates:

* Microservices Architecture
* API Gateway Pattern
* JWT Authentication
* Refresh Token Rotation
* Role-Based Access Control
* RESTful API Design
* Service-to-Service Communication
* Docker Containerization
* MongoDB Data Modeling
* React SPA Development

---