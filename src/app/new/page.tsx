import BookingForm from '@/components/BookingForm'
import DateSelect from '@/components/DateSelect'
import { getRooms } from '@/lib/bookings'
import { todayISO } from '@/utils/datetime'

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const { date } = await searchParams
  // date が null または undefined の場合にのみ todayISO() を呼び出し、その結果を使う。date に何か値（空文字列 '' も含む）が入っていればそのまま date を使う。
  const selectedDate = date ?? todayISO()

  const rooms = await getRooms()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">予約を作成</h2>
      <DateSelect value={selectedDate} />
      <BookingForm rooms={rooms} selectedDate={selectedDate} />
    </div>
  )
}
