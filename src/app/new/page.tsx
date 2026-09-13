import BookingForm from '@/components/BookingForm'

import { getRooms } from '@/lib/bookings'
import { todayISO } from '@/utils/datetime'

// export default async function NewBookingPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ date?: string }>
// }) {


export default async function NewBookingPage(props: {
  searchParams: Promise<{ date?: string }>
}) {
  // const { date } = await searchParams
  const searchParamsResult = await props.searchParams
  const date = searchParamsResult.date
  const selectedDate = date ?? todayISO()

  const rooms = await getRooms()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">予約を作成</h2>
      <BookingForm rooms={rooms} selectedDate={selectedDate} />
    </div>
  )
}
