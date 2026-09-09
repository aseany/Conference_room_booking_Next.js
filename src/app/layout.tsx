import type { Metadata } from 'next'
import { Suspense } from 'react'
import TabBar from '@/components/TabBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'ver4（Next.js版）',
}
// RootLayout	このファイルが export する関数コンポーネント。Next.js の App Router 規約で、app/layout.tsx の default export はルート全体（および配下の全ページ）を包むレイアウトとして自動的に使われる。
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body>
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">ver4（Next.js版）</h1>
          <Suspense><TabBar /></Suspense>
          {children}
        </div>
      </body>
    </html>
  )
}
// ↓分割代入なしの場合
// export default function RootLayout(props: LayoutProps<"/">) {
//   return (
//     <html lang="ja">
//       <body>
//         <div className="p-8 max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8">ver4（Next.js版）</h1>
//           <Suspense><TabBar /></Suspense>
//           {props.children}
//         </div>
//       </body>
//     </html>
//   )
// }
