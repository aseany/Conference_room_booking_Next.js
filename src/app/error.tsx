// App Routerでは、エラーが発生した場合、自動的にこのファイルが表示される。
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
      <p className="font-bold mb-2">エラーが発生しました</p>
      <p className="text-sm mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="text-sm text-red-600 underline hover:no-underline"
      >
        もう一度試す
      </button>
    </div>
  )
}
