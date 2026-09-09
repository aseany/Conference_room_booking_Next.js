import 'server-only'
import { supabase } from './supabase'
import type { Room, Booking } from '@/types/booking'

export async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms').select('*').order('name', { ascending: true })
  if (error) throw new Error('会議室の取得に失敗しました')
  return data as Room[]
}

export async function getBookingsForDate(date: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings').select('*')
    .eq('booking_date', date)
    .order('start_time', { ascending: true })
  if (error) throw new Error('予約の取得に失敗しました')
  return data as Booking[]
}

export type BookingInput = {
  room_id: string
  booking_date: string
  start_time: string
  end_time: string
  reserver_name: string
  title: string
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  const { data, error } = await supabase.rpc('create_booking', {
    p_room_id: input.room_id,
    p_booking_date: input.booking_date,
    p_start_time: input.start_time,
    p_end_time: input.end_time,
    p_reserver_name: input.reserver_name,
    p_title: input.title,
  })
  if (error) throw new Error('この時間帯は既に予約されています')
  return data as Booking
}

export async function hasOverlap(
  input: Pick<BookingInput, 'room_id' | 'booking_date' | 'start_time' | 'end_time'>,
  excludeId?: string,
): Promise<boolean> {
  const { data: existing } = await supabase
    .from('bookings')
    .select('id, start_time, end_time')
    .eq('room_id', input.room_id)
    .eq('booking_date', input.booking_date)

  return (existing ?? []).some(
    (b) =>
      b.id !== excludeId &&
      input.start_time < b.end_time &&
      input.end_time > b.start_time,
  )
}

export async function updateBooking(id: string, input: BookingInput): Promise<void> {
  const { error } = await supabase.rpc('update_booking', {
    p_booking_id: id,
    p_room_id: input.room_id,
    p_booking_date: input.booking_date,
    p_start_time: input.start_time,
    p_end_time: input.end_time,
    p_reserver_name: input.reserver_name,
    p_title: input.title,
  })
  if (error) throw new Error('この時間帯は既に予約されています')
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.rpc('delete_booking', { p_booking_id: id })
  if (error) throw new Error('予約の削除に失敗しました')
}
