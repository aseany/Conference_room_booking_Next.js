import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <p className="text-gray-500 mb-4">ページが見つかりません</p>
      <Link href="/new" className="text-blue-600 hover:underline">
        予約を作成へ戻る
      </Link>
    </div>
  )
}
