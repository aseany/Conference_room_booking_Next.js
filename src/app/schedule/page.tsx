import RoomSchedule from '@/components/RoomSchedule'
import DateSelect from '@/components/DateSelect'
import { getRooms, getBookingsForDate } from '@/lib/bookings'
import { todayISO } from '@/utils/datetime'

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const { date } = await searchParams
  const selectedDate = date ?? todayISO()

  const [rooms, bookings] = await Promise.all([
    getRooms(),
    getBookingsForDate(selectedDate),
  ])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">スケジュール</h2>
      <DateSelect value={selectedDate} />
      <RoomSchedule rooms={rooms} bookings={bookings} />
    </div>
  )
}
