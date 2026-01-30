export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Calm Content Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <a href="/" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '600',
              fontSize: '18px',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}>Home</a>
          </div>
          <a href="/admin" style={{
            textDecoration: 'none',
            color: '#6366f1',
            fontWeight: '600',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6',
            transition: 'background-color 0.2s'
          }}>Admin</a>
        </nav>
        <main style={{ paddingTop: '60px' }}>{children}</main>
      </body>
    </html>
  )
}