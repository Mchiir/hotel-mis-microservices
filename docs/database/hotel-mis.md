<!-- This becomes the source of truth. -->
```dbml
Table users {
  _id objectId [pk]

  firstName varchar
  lastName varchar
  phone varchar
  email varchar
  password varchar

  role varchar
  tokenVersion int

  createdAt timestamp
  updatedAt timestamp
}

Table rooms {
  _id objectId [pk]

  roomNumber varchar
  roomType varchar

  floor int
  capacity int

  pricePerNight decimal

  status varchar

  createdAt timestamp
  updatedAt timestamp
}

Table guests {
  _id objectId [pk]

  firstName varchar
  lastName varchar

  phone varchar
  email varchar

  nationality varchar
  idNumber varchar

  createdAt timestamp
  updatedAt timestamp
}

Table reservations {
  _id objectId [pk]

  guestId objectId
  roomId objectId

  checkInDate date
  checkOutDate date

  numberOfGuests int

  status varchar

  createdAt timestamp
  updatedAt timestamp
}

Table payments {
  _id objectId [pk]

  reservationId objectId

  amount decimal

  paymentMethod varchar

  paidAt timestamp

  createdAt timestamp
  updatedAt timestamp
}

Ref: guests._id < reservations.guestId
Ref: rooms._id < reservations.roomId
Ref: reservations._id < payments.reservationId
```