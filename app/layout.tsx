export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Calm Content Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ backgroundColor: '#f7f1e3', color: '#2b2b2b', margin: 0 }}>
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
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>The Calm Content Companion&trade;</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {['Home', 'Admin'].map((link) => (
              <a key={link} href={link === 'Home' ? '/' : '/admin'} style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 12px',
                transition: 'color 0.2s'
              }}>
                {link}
              </a>
            ))}
          </div>
        </nav>
        <main style={{ paddingTop: '70px' }}>{children}</main>
      </body>
    </html>
  )
}
