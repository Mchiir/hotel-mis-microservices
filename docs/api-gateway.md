```mermaid
flowchart TD

Client --> Gateway

Gateway --> Auth
Gateway --> Users
Gateway --> Rooms
Gateway --> Reservations
Gateway --> Payments
Gateway --> Reports
```