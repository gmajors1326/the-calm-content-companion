'use client'

import React, { useState, useCallback, useTransition } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const PAGE_TITLE = 'The Calm Content Companion'

export default function HomePage() {
  // Server components cannot use state/hooks, so we switch to client component mode
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, startTransition] = useTransition()

  // Naive SSR cookie check remains for navigation/state indication
  const cookieHeader = cookies().toString()
  const session = (cookieHeader.match(/session=([^;]+)/) || [])[1]
  
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
              { role: 'system', content: 'You are a helpful and concise AI assistant.' },
              ...messages, // Include history if desired, otherwise just send the latest
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
          // Handle API errors returned from route.ts
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  }

  const messageListStyle: React.CSSProperties = {
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  }

  const userBubbleStyle: React.CSSProperties = {
    textAlign: 'right',
    marginBottom: '10px',
  }

  const assistantBubbleStyle: React.CSSProperties = {
    textAlign: 'left',
    marginBottom: '10px',
    backgroundColor: '#e0f7fa',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%',
    display: 'inline-block',
  }

  return (
    <div style={containerStyle}>
      <h1>{PAGE_TITLE}</h1>
      <nav style={{ marginTop: 20, marginBottom: 20 }}>
        <Link href="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link href="/admin">Admin</Link>
        <div style={{ marginTop: 10, fontSize: '0.9em' }}>
            {session ? <span>Logged in via SSR cookie</span> : <span>Not logged in</span>}
        </div>
      </nav>

      <h2>AI Chat Demo</h2>
      <div style={messageListStyle}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === 'user' ? userBubbleStyle : {}}>
            <div style={msg.role === 'assistant' ? assistantBubbleStyle : {}}>
              <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
            <div style={{textAlign: 'left', marginBottom: '10px'}}><div style={assistantBubbleStyle}><strong>AI:</strong> Typing...</div></div>
        )}
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={3}
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }}
        disabled={isLoading}
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || !prompt.trim()}
        style={{ padding: '10px 20px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'Sending...' : 'Send to OpenAI'}
      </button>
    </div>
  )
}

