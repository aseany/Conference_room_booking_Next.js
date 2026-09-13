// Next.jsのApp Routerが特別に解釈する「ディレクティブ（指示文）」。ファイルの一番先頭に書く必要がある。プロジェクト固有のコードではなく、Next.js（React Server Components）が定めた予約構文。
// ブラウザ側の機能(Hook・イベントハンドラ・状態)を使うために、use client ディレクティブを書く。
'use client'

// linkはNext.jsが提供する組み込みコンポーネント（プロジェクト独自コードではない）。HTMLの <a> タグの代わりに使う、ページ遷移用のコンポーネント。
import Link from 'next/link'
// 名前付きインポート
// usePathnameは	Next.jsが提供する組み込みReact Hook。現在表示中のURLのパス部分（クエリを除く、例：/new）を返す。
// useSearchParams	Next.jsが提供する組み込みReact Hook。現在のURLのクエリパラメータ（?date=2026-09-08など）を読み取るためのオブジェクトを返す。
import { usePathname, useSearchParams } from 'next/navigation'
// デフォルトエクスポート
export default function TabBar() {
  const pathname = usePathname()
  // console.log(pathname,'pathname')
  const searchParams = useSearchParams()
  // console.log(searchParams ,'searchParams')

  const withDate = (href: string) => {
    const qs = searchParams.toString()
    // console.log(qs ,'qsクエリパラメータ')
    return qs ? `${href}?${qs}` : href
  }

  const className = (href: string) =>
    pathname === href
      ? 'px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-bold'
      : 'px-4 py-2 text-gray-500 hover:text-gray-700'

  return (
    <div className="flex border-b mb-6">
      <Link href={withDate('/new')} className={className('/new')}>予約を作成！！</Link>
      <Link href={withDate('/schedule')} className={className('/schedule')}>スケジュール</Link>
    </div>
  )
}
