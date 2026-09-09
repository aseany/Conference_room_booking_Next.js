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
