export interface Room {
  id: string
  name: string
}

export interface Booking {
  id: string
  room_id: string
  booking_date: string
  start_time: string
  end_time: string
  reserver_name: string
  title: string
}
