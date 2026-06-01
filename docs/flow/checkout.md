```mermaid
sequenceDiagram

actor Receptionist

participant ReservationService
participant RoomService

Receptionist->>ReservationService: Check-Out

ReservationService->>RoomService: Mark Available

RoomService-->>ReservationService: Updated

ReservationService-->>Receptionist: Check-Out Success
```