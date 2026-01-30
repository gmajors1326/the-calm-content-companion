'use client'

import React, { useState, useCallback, useTransition, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const PAGE_TITLE = 'The Calm Content Companion'
const PRIMARY_COLOR = '#1A3D33' // Dark Forest Green for background elements
const ACCENT_COLOR = '#F5F5DC'  // Cream/Beige for main content background
const TEXT_COLOR = '#E0E0E0'    // Off-white for readability

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, startTransition] = useTransition()
  const [session, setSession] = useState<string | null>(null)

  // Client-side cookie check for session
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const cookieHeader = document.cookie
        const sessionMatch = cookieHeader.match(/session=([^;]+)/)
        setSession(sessionMatch ? sessionMatch[1] : null)
    }
  }, [])
  
  const sendMessage = useCallback(async () => {
    if (!prompt.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: prompt }
    setMessages(prev => [...prev, userMessage])
    setPrompt('')

    startTransition(async () => {
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'You are a helpful and concise AI assistant. Match the professional, calm tone of the site.' },
              userMessage,
            ],
            model: 'gpt-3.5-turbo',
            max_tokens: 500
          }),
        })

        const data = await response.json()

        if (response.ok && data.completion) {
          const assistantMessage: Message = { role: 'assistant', content: data.completion }
          setMessages(prev => [...prev, assistantMessage])
        } else {
          const errorMessage = data.error || 'An unknown API error occurred.'
          const assistantMessage: Message = { role: 'assistant', content: `Error: ${errorMessage}` }
          setMessages(prev => [...prev, assistantMessage])
        }
      } catch (error) {
        console.error('Fetch error:', error)
        const assistantMessage: Message = { role: 'assistant', content: 'Network error connecting to /api/openai.' }
        setMessages(prev => [...prev, assistantMessage])
      }
    })
  }, [prompt, isLoading, messages])

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: PRIMARY_COLOR,
    color: TEXT_COLOR,
    padding: '40px 20px',
    fontFamily: 'sans-serif',
  }

  const contentCardStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: ACCENT_COLOR,
    color: '#333',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  }

  const messageListStyle: React.CSSProperties = {
    height: '350px',
    overflowY: 'auto',
    border: `1px solid ${PRIMARY_COLOR}`,
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  }

  const userBubbleStyle: React.CSSProperties = {
    textAlign: 'right',
    marginBottom: '10px',
  }

  const assistantBubbleStyle: React.CSSProperties = {
    textAlign: 'left',
    marginBottom: '10px',
    backgroundColor: '#d1e7dd', // Light green success color for contrast
    color: '#155724',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%',
    display: 'inline-block',
  }

  const inputAreaStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    border: `1px solid ${PRIMARY_COLOR}`,
    borderRadius: '4px',
  }

  return (
    <div style={containerStyle}>
      <header style={{textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{color: ACCENT_COLOR, fontSize: '2.5em', marginBottom: '5px'}}>
            {PAGE_TITLE}
        </h1>
        <p style={{color: TEXT_COLOR, fontSize: '1.2em'}}>
            Integrate AI insights directly into your workflow.
        </p>
        <nav style={{ marginTop: 20 }}>
          <Link href="/login" style={{ color: '#90EE90', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
          <Link href="/admin" style={{ color: '#90EE90', textDecoration: 'none' }}>Admin</Link>
        </nav>
        <p style={{ marginTop: 10, fontSize: '0.8em', color: TEXT_COLOR }}>
            {session ? <span>Status: Logged in</span> : <span>Status: Not logged in</span>}
        </p>
      </header>

      <div style={contentCardStyle}>
        <h2>AI Assistant</h2>
        <div style={messageListStyle}>
          {messages.length === 0 ? (
              <p style={{color: '#666'}}>Send a message to start the conversation...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} style={msg.role === 'user' ? userBubbleStyle : {}}>
                <div style={msg.role === 'assistant' ? assistantBubbleStyle : {backgroundColor: '#eee', color: '#333'}}>
                  <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
              <div style={{textAlign: 'left', marginBottom: '10px'}}><div style={assistantBubbleStyle}><strong>AI:</strong> Thinking...</div></div>
          )}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask the AI anything..."
          rows={3}
          style={inputAreaStyle}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !prompt.trim()}
          style={{ 
            padding: '10px 20px', 
            cursor: isLoading || !prompt.trim() ? 'not-allowed' : 'pointer',
            backgroundColor: isLoading || !prompt.trim() ? PRIMARY_COLOR : '#34D399', // Bright green accent on hover/active
            color: ACCENT_COLOR,
            border: 'none',
            borderRadius: '4px',
            fontSize: '1em'
          }}
        >
          {isLoading ? 'Processing...' : 'Send Prompt'}
        </button>
      </div>

      <footer style={{textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #333'}}>
        <p style={{fontSize: '0.8em', color: '#888'}}>
            Placeholder Footer Content (Style Inspired by Promoto Template)
        </p>
      </footer>
    </div>
  )
}


