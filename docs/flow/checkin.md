```mermaid
sequenceDiagram

actor Receptionist

participant ReservationService
participant RoomService

Receptionist->>ReservationService: Check-In

ReservationService->>RoomService: Mark Occupied

RoomService-->>ReservationService: Updated

ReservationService-->>Receptionist: Check-In Success
```