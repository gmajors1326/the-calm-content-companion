export const metadata = {
  title: 'The Calm Content Companion',
  description: 'Integrate AI insights directly into your workflow.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
