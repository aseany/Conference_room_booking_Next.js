'use client'
// useRouterページ遷移を実行するための Hook。router.push(URL) を呼ぶと、そのURLに画面遷移
// usePathname 現在のURLのパス部分(クエリを除く。例: /new や /schedule)を返す Hook
import { useRouter, usePathname } from 'next/navigation'
// @ は src/ を指すエイリアス(tsconfig.json で設定されている省略記法)。
import { formatWeekday, todayISO } from '@/utils/datetime'

interface DateSelectProps {
  value: string
  label?: string
}
// ここから
export default function DateSelect({ value, label = '日付' }: DateSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  // ↓分割代入を使わずに書くと
  // export default function DateSelect(props: DateSelectProps) {
  //   const value = props.value
  //   const label = props.label === undefined ? '日付' : props.label
  //   ...
  // }
  
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
