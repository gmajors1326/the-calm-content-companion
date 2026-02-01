import './globals.css'

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
          position: 'static',
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#f7f1e3',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontFamily: '"Poppins", sans-serif'
        }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="/" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '20px',
              padding: '8px 12px',
              transition: 'color 0.2s'
            }}>
              Home
            </a>
            <a href="https://the-calm-content-companion.vercel.app/view-the-guide" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '20px',
              padding: '8px 12px',
              transition: 'color 0.2s'
            }}>
              View the Guide
            </a>
            <a href="/" style={{
              textDecoration: 'none',
              color: '#2b2b2b',
              fontWeight: '400',
              fontSize: '20px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid #e5dcc6',
              backgroundColor: '#fff1cf',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              letterSpacing: '0.2px',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              Start Your 3 Day Free Trial
            </a>
            <a href="/pricing" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '20px',
              padding: '8px 12px',
              transition: 'color 0.2s'
            }}>
              Pricing
            </a>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <a href="/admin" style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: '400',
              fontSize: '10px',
              padding: '8px 12px',
              transition: 'color 0.2s'
            }}>
              Admin
            </a>
          </div>
        </nav>
        <main style={{ paddingTop: '70px' }}>{children}</main>
      </body>
    </html>
  )
}
