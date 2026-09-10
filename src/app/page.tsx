// src/app/page.tsx の役割は、App Router のファイルベースルーティングにおいて /（ルートURL）に対応する画面 を定義することです。
//redirectは	next/navigation パッケージが提供する、Next.js組み込みの関数。サーバー側（Server Component）でリダイレクトを行うための専用API。
// node_modules/next/navigation.jsにあるredirect関数をimport
import { redirect } from 'next/navigation'

// このファイル（app/page.tsx、つまりルート /）が担当する React コンポーネント。Next.js の規約で、ドキュメントルートの page.tsx の default export がそのURLの画面本体として使われる。
// / にアクセスされたら何も表示せず、必ず /new にリダイレクトする
// app/page.tsx のdefault export。プロジェクトコードは呼び出し側を持たない。
export default function Home() {
  redirect('/new')
}
