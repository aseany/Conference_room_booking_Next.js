'use client'

import { useState } from 'react'
import type { Room, Booking } from '@/types/booking'
import { deleteBookingAction } from '@/lib/actions'
import EditBookingModal from './EditBookingModal'

interface RoomScheduleProps {
  rooms: Room[]
  bookings: Booking[]
}

export default function RoomSchedule({ rooms, bookings }: RoomScheduleProps) {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)

  function formatTime(time: string): string {
    return time.substring(0, 5)
  }

  function getBookingsForRoom(roomId: string): Booking[] {
    return bookings.filter((b) => b.room_id === roomId)
  }

  const handleDelete = async (booking: Booking) => {
    if (!window.confirm(`「${booking.title}」の予約をキャンセルしますか？`)) return
    await deleteBookingAction(booking.id)
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
                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setEditingBooking(booking)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          変更
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(booking)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          キャンセル
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })
      )}

      {editingBooking && (
        <EditBookingModal
          booking={editingBooking}
          rooms={rooms}
          onClose={() => setEditingBooking(null)}
        />
      )}
    </div>
  )
}
