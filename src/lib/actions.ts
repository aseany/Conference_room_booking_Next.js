'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
// import { createBooking, hasOverlap } from './bookings'
import { createBooking, hasOverlap, updateBooking, deleteBooking } from './bookings'


export type ActionState = { error: string } | null

export async function createBookingAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const input = {
    room_id: String(formData.get('room_id') ?? ''),
    booking_date: String(formData.get('booking_date') ?? ''),
    start_time: String(formData.get('start_time') ?? ''),
    end_time: String(formData.get('end_time') ?? ''),
    reserver_name: String(formData.get('reserver_name') ?? ''),
    title: String(formData.get('title') ?? ''),
  }

  if (Object.values(input).some((v) => !v)) return { error: 'すべてのフィールドを入力してください' }
  if (input.end_time <= input.start_time) return { error: '終了時刻は開始時刻より後である必要があります' }
  if (await hasOverlap(input)) return { error: 'この時間帯は既に予約されています' }

  try {
    await createBooking(input)
  } catch (e) {
    return { error: e instanceof Error ? e.message : '予約の作成に失敗しました' }
  }

  revalidatePath('/schedule')
  redirect(`/schedule?date=${input.booking_date}`)
}
export async function updateBookingAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get('id') ?? '')
  const input = {
    room_id: String(formData.get('room_id') ?? ''),
    booking_date: String(formData.get('booking_date') ?? ''),
    start_time: String(formData.get('start_time') ?? ''),
    end_time: String(formData.get('end_time') ?? ''),
    reserver_name: String(formData.get('reserver_name') ?? ''),
    title: String(formData.get('title') ?? ''),
  }

  if (Object.values(input).some((v) => !v)) return { error: 'すべてのフィールドを入力してください' }
  if (input.end_time <= input.start_time) return { error: '終了時刻は開始時刻より後である必要があります' }
  if (await hasOverlap(input, id)) return { error: 'この時間帯は既に予約されています' }

  try {
    await updateBooking(id, input)
  } catch (e) {
    return { error: e instanceof Error ? e.message : '予約の更新に失敗しました' }
  }

  revalidatePath('/schedule')
  redirect(`/schedule?date=${input.booking_date}`)
}

export async function deleteBookingAction(id: string): Promise<void> {
  await deleteBooking(id)
  revalidatePath('/schedule')
}
