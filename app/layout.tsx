export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Calm Content Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ backgroundColor: '#1c3125', color: '#e5e7eb', margin: 0 }}>
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#fff',
          borderBottom: '4px solid rgba(229, 229, 229, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>The Calm Content Companion&trade;</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {['Home', 'Features', 'About', 'Pricing', 'Blogs'].map((link) => (
              <a key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 12px',
                transition: 'color 0.2s',
                position: 'relative'
              }}>
                {link}
                {link === 'Home' && <span style={{ position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '2px', backgroundColor: '#333', borderRadius: '1px' }}></span>}
              </a>
            ))}
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
             <button style={{
                backgroundColor: 'transparent',
                color: '#333',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #e5e5e5',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
            }}>Strat Trial</button>
          </div>
        </nav>
        <main style={{ paddingTop: '70px' }}>{children}</main>
      </body>
    </html>
  )
}