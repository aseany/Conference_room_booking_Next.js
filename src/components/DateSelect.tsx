'use client'

import { useRouter, usePathname } from 'next/navigation'
import { formatWeekday, todayISO } from '@/utils/datetime'

interface DateSelectProps {
  value: string
  label?: string
}

export default function DateSelect({ value, label = '日付' }: DateSelectProps) {
  const router = useRouter()
  const pathname = usePathname()

  const onChange = (date: string) => router.push(`${pathname}?date=${date}`)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          type="date"
          min={todayISO()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-sm text-gray-600 pointer-events-none">
          （{formatWeekday(value)}）
          {value === todayISO() && '今日'}
        </span>
      </div>
    </div>
  )
}
