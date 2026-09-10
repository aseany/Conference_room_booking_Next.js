import type { Metadata } from 'next'
// ↓よくわからん
import { Suspense } from 'react'
import TabBar from '@/components/TabBar'
import './globals.css'

// export const metadata	Next.jsのApp Router規約における予約された変数名。layout.tsxやpage.tsxからmetadataという名前でexportすると、Next.jsが自動的に読み取る。
// : Metadata	layout.tsx:1でimportした型注釈。titleなどのプロパティ名・型が正しいかをTypeScriptにチェックさせる。
// layout.tsxはこのアプリ全体（ルート/以下すべて）に適用されるレイアウトなので、ここで指定したmetadataは、個別のページで上書きされない限りアプリ全体の共通タイトルとして使われます。
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
          {/*Suspense Reactの機能で、中の子コンポーネント(TabBar)がまだ準備できていない(データ取得中・非同期の初期化中など)間、代わりのUIを表示できるようにする仕組 */}
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
