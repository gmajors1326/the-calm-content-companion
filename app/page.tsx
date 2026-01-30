export default function HomePage() {
  const cards = [
    { id: 1, title: 'Content Strategy', description: 'Plan and organize your content calendar with AI-powered insights.' },
    { id: 2, title: 'Analytics Dashboard', description: 'Track engagement metrics and performance across all channels.' },
    { id: 3, title: 'Team Collaboration', description: 'Work together seamlessly with real-time editing and comments.' },
    { id: 4, title: 'AI Assistant', description: 'Generate ideas, outlines, and drafts with intelligent suggestions.' },
    { id: 5, title: 'Publishing Workflow', description: 'Streamline your publishing process from draft to distribution.' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '40px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '32px',
          textAlign: 'center'
        }}>The Calm Content Companion</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {cards.map(card => (
            <div key={card.id} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>{card.title}</h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}