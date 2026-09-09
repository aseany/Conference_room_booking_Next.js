import RoomSchedule from '@/components/RoomSchedule'
import { getRooms, getBookingsForDate } from '@/lib/bookings'
import { todayISO } from '@/utils/datetime'

export default async function SchedulePage() {
  const selectedDate = todayISO()
  const [rooms, bookings] = await Promise.all([
    getRooms(),
    getBookingsForDate(selectedDate),
  ])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">スケジュール</h2>
      <RoomSchedule rooms={rooms} bookings={bookings} />
    </div>
  )
}
