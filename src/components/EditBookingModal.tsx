'use client'

import { useActionState, useState } from 'react'
import { TIME_SLOTS, todayISO, currentTimeJST } from '@/utils/datetime'
import type { Room, Booking } from '@/types/booking'
import { updateBookingAction } from '@/lib/actions'

interface EditBookingModalProps {
  booking: Booking
  rooms: Room[]
  onClose: () => void
}

export default function EditBookingModal({ booking, rooms, onClose }: EditBookingModalProps) {
  const [state, formAction, isPending] = useActionState(updateBookingAction, null)
  const [bookingDate, setBookingDate] = useState(booking.booking_date)
  const [startTime, setStartTime] = useState(booking.start_time.substring(0, 5))

  const availableStartTimes =
    bookingDate === todayISO()
      ? TIME_SLOTS.filter((t) => t >= currentTimeJST() || t === startTime)
      : TIME_SLOTS

  const availableEndTimes = startTime
    ? availableStartTimes.filter((t) => t > startTime)
    : availableStartTimes

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">予約を編集</h2>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={booking.id} />

          <div>
            <label className="block text-sm font-medium mb-2">会議室</label>
            <select name="room_id" defaultValue={booking.room_id} className="border p-2 rounded w-full">
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">日付</label>
            <input
              type="date"
              name="booking_date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={todayISO()}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">開始時刻</label>
            <select
              name="start_time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">選択してください</option>
              {availableStartTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">終了時刻</label>
            <select name="end_time" defaultValue={booking.end_time.substring(0, 5)} className="border p-2 rounded w-full">
              <option value="">選択してください</option>
              {availableEndTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">予約者名</label>
            <input
              type="text"
              name="reserver_name"
              defaultValue={booking.reserver_name}
              className="border p-2 rounded w-full"
              placeholder="例：田中"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">会議タイトル</label>
            <input
              type="text"
              name="title"
              defaultValue={booking.title}
              className="border p-2 rounded w-full"
              placeholder="例：予算会議"
            />
          </div>

          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
              {state.error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isPending ? '更新中...' : '更新'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
