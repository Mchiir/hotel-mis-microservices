# HOTEL MIS FRONTEND GENERATION PROMPT

You are a senior frontend engineer.

Generate a complete Hotel MIS frontend SPA.

Follow the same architecture style as a previously built Smart Parking Information System.

Priorities:

* Simplicity
* Reusability
* Readability
* Fast implementation
* Beginner-friendly code

Avoid:

* Redux
* Zustand
* MobX
* Complex state management

Use React hooks only.

---

# TECH STACK

* Vite
* ReactJS (JavaScript)
* React Router
* Fetch API
* TailwindCSS
* Lucide Icons
* React Hot Toast
* SweetAlert2

---

# AUTH DESIGN

Access Token

* stored in memory

Refresh Token

* HTTP-only cookie

Implement automatic refresh handling in:

api/http.js

Requirements:

* retry expired requests
* logout on refresh failure

---

# FOLDER STRUCTURE

src/

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

# ROLES

ADMIN

RECEPTIONIST

ACCOUNTANT

Use shared frontend constants.

---

# ROUTES

/login
/register

/dashboard

/rooms
/rooms/create
/rooms/:id

/guests
/guests/:id

/reservations
/reservations/:id

/check-in
/check-out

/payments

/reports/revenue
/reports/occupancy
/reports/reservations
/reports/checkins

/users
/users/:id

/profile

---

# DASHBOARDS

ADMIN

* Total Rooms
* Occupied Rooms
* Reservations
* Revenue
* Recent Reservations
* Recent Payments

RECEPTIONIST

* Today's Check-ins
* Today's Check-outs
* Available Rooms
* Active Reservations

ACCOUNTANT

* Today's Revenue
* Monthly Revenue
* Payments Received
* Pending Payments

---

# SIDEBAR

ADMIN

Dashboard
Rooms
Guests
Reservations
Payments
Reports
Users
Profile

RECEPTIONIST

Dashboard
Guests
Reservations
Check-In
Check-Out
Rooms
Profile

ACCOUNTANT

Dashboard
Payments
Revenue Reports
Profile

---

# REUSABLE COMPONENTS

Table

* loading state
* empty state
* pagination

Modal

* reusable wrapper

FormInput

* labels
* errors

Badge

ACTIVE
INACTIVE
PAID
UNPAID

ProtectedRoute

* auth protection
* role protection

---

# NOTIFICATIONS

Use React Hot Toast

Examples:

toast.success()
toast.error()

Never use:

window.alert()

Use SweetAlert2 for:

* delete confirmation
* logout confirmation
* destructive actions

---

# UI PRINCIPLES

* Responsive
* Semantic layouts
* Reusable components
* Consistent spacing
* Tailwind utility classes
* Beginner-friendly code
* Clean architecture
* No overengineering

Generate complete working code for all pages, APIs, layouts, routes, and reusable components.
