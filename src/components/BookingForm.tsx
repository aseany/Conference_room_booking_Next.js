'use client'

import { useActionState, useState } from 'react'
import type { Room } from '@/types/booking'
import { TIME_SLOTS, todayISO, currentTimeJST } from '@/utils/datetime'
import { createBookingAction } from '@/lib/actions'

interface BookingFormProps {
  rooms: Room[]
  selectedDate: string
}

export default function BookingForm({ rooms, selectedDate }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(createBookingAction, null)
  const [startTime, setStartTime] = useState('')

  const availableStartTimes =
    selectedDate === todayISO()
      ? TIME_SLOTS.filter((t) => t >= currentTimeJST())
      : TIME_SLOTS

  const availableEndTimes = startTime
    ? availableStartTimes.filter((t) => t > startTime)
    : availableStartTimes

  return (
    <form action={formAction} className="rounded-lg space-y-4">
      <input type="hidden" name="booking_date" value={selectedDate} />

      <div>
        <label className="block text-sm font-medium mb-2">会議室</label>
        <select name="room_id" defaultValue="" className="border p-2 rounded w-full">
          <option value="">選択してください</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
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
        <select name="end_time" defaultValue="" className="border p-2 rounded w-full">
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
          className="border p-2 rounded w-full"
          placeholder="例：田中"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">会議タイトル</label>
        <input
          type="text"
          name="title"
          className="border p-2 rounded w-full"
          placeholder="例：予算会議"
        />
      </div>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isPending ? '作成中...' : '予約を作成'}
      </button>
    </form>
  )
}
