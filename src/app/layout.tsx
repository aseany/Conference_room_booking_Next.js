import type { Metadata } from 'next'
import { Suspense } from 'react'
import TabBar from '@/components/TabBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'ver4（Next.js版）',
}

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
