'use client'

import type { Room, Booking } from '@/types/booking'

interface RoomScheduleProps {
  rooms: Room[]
  bookings: Booking[]
}

export default function RoomSchedule({ rooms, bookings }: RoomScheduleProps) {
  function formatTime(time: string): string {
    return time.substring(0, 5)
  }

  function getBookingsForRoom(roomId: string): Booking[] {
    return bookings.filter((b) => b.room_id === roomId)
  }

  return (
    <div className="space-y-4">
      {rooms.length === 0 ? (
        <p className="text-gray-500">会議室が見つかりません</p>
      ) : (
        rooms.map((room) => {
          const roomBookings = getBookingsForRoom(room.id)
          return (
            <div key={room.id} className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">{room.name}</h3>
              {roomBookings.length === 0 ? (
                <p className="text-gray-500 text-sm">予約なし</p>
              ) : (
                <ul className="space-y-2">
                  {roomBookings.map((booking) => (
                    <li
                      key={booking.id}
                      className="bg-blue-50 border border-blue-200 p-2 rounded text-sm"
                    >
                      <div className="font-semibold">
                        {formatTime(booking.start_time)}–{formatTime(booking.end_time)}
                      </div>
                      <div className="text-gray-700">{booking.title}</div>
                      <div className="text-gray-500 text-xs">{booking.reserver_name}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
