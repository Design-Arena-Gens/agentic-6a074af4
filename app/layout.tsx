import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neon Cat Animation',
  description: 'A cute fluffy cat watching floating swirling neon colors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
