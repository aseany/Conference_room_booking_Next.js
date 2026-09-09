// ファイル名は完全に予約された特別な名前。同じディレクトリ（今回はapp/直下、つまりアプリ全体）の中でページがサーバー側のデータ取得を待っている間、Next.jsが自動的にこれを表示する。自分でif (isLoading)のような分岐を書く必要は一切ない。App Routerを使用する場合、必ずこのファイルを作成すること。
export default function Loading() {
  return <p className="text-gray-500">読み込み中...</p>
}
