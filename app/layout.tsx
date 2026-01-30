export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Calm Content Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bigtime&family=Poppins:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#f7f1e3', color: '#2b2b2b', margin: 0, fontFamily: '"Poppins", sans-serif' }}>
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#f7f1e3',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 1000
        }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <span style={{ fontSize: '20px', fontWeight: '400', color: '#333', fontFamily: '"Poppins", sans-serif' }}>The Calm Content Companion&trade;</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="/" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '14px',
              padding: '8px 12px',
              transition: 'color 0.2s',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Home
            </a>
            <a href="/" style={{
              textDecoration: 'none',
              color: '#2b2b2b',
              fontWeight: '400',
              fontSize: '13px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid #e5dcc6',
              backgroundColor: '#fff1cf',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              letterSpacing: '0.2px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Start Your 3 Day Free Trial
            </a>
            <a href="/admin" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '14px',
              padding: '8px 12px',
              transition: 'color 0.2s',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Admin
            </a>
          </div>
          <div style={{ flex: 1 }}></div>
        </nav>
        <main style={{ paddingTop: '70px' }}>{children}</main>
      </body>
    </html>
  )
}
