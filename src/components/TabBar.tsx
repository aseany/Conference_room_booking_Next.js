'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function TabBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const withDate = (href: string) => {
    const qs = searchParams.toString()
    return qs ? `${href}?${qs}` : href
  }

  const className = (href: string) =>
    pathname === href
      ? 'px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-bold'
      : 'px-4 py-2 text-gray-500 hover:text-gray-700'

  return (
    <div className="flex border-b mb-6">
      <Link href={withDate('/new')} className={className('/new')}>予約を作成</Link>
      <Link href={withDate('/schedule')} className={className('/schedule')}>スケジュール</Link>
    </div>
  )
}
