<!-- Business process documentation. -->
```mermaid
sequenceDiagram

actor Receptionist

participant ReservationService
participant RoomService
participant PaymentService

Receptionist->>ReservationService: Create Reservation

ReservationService->>RoomService: Check Availability

RoomService-->>ReservationService: Available

ReservationService-->>Receptionist: Reservation Created

Receptionist->>PaymentService: Record Payment

PaymentService-->>Receptionist: Payment Success
```