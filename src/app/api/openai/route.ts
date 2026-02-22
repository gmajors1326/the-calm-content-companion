// src/app/api/openai/route.ts
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/openai'

interface ChatCompletionRequest {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
  model?: string
  temperature?: number
  max_tokens?: number
  top_p?: number
}

export async function POST(req: NextRequest) {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Parse request body
    let body: ChatCompletionRequest
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body. Must be valid JSON.' },
        { status: 400 }
      )
    }

    // Validate required parameters
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid "messages" parameter. Expected array of message objects.' },
        { status: 400 }
      )
    }

    if (body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array cannot be empty.' },
        { status: 400 }
      )
    }

    // Validate message format
    for (const msg of body.messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: 'Each message must have "role" and "content" properties.' },
          { status: 400 }
        )
      }
      if (!['system', 'user', 'assistant'].includes(msg.role)) {
        return NextResponse.json(
          { error: 'Invalid message role. Must be "system", "user", or "assistant".' },
          { status: 400 }
        )
      }
    }

    // Set defaults and validate optional parameters
    const model = body.model || 'gpt-3.5-turbo'
    const temperature = body.temperature ?? 0.7
    const max_tokens = body.max_tokens || 2048
    const top_p = body.top_p ?? 1

    // Validate parameter ranges
    if (typeof temperature !== 'number' || temperature < 0 || temperature > 2) {
      return NextResponse.json(
        { error: 'Invalid "temperature". Must be a number between 0 and 2.' },
        { status: 400 }
      )
    }

    if (typeof max_tokens !== 'number' || max_tokens < 1 || max_tokens > 4096) {
      return NextResponse.json(
        { error: 'Invalid "max_tokens". Must be a number between 1 and 4096.' },
        { status: 400 }
      )
    }

    if (typeof top_p !== 'number' || top_p < 0 || top_p > 1) {
      return NextResponse.json(
        { error: 'Invalid "top_p". Must be a number between 0 and 1.' },
        { status: 400 }
      )
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable not set')
      return NextResponse.json(
        { error: 'OpenAI API key is not configured.' },
        { status: 500 }
      )
    }

    // Get OpenAI client and make request
    const openai: any = getOpenAI()

    const response: any = await openai.createChatCompletion({
      model,
      messages: body.messages,
      temperature,
      max_tokens,
      top_p,
    })

    // Extract the completion
    const completion = response.data.choices[0]?.message?.content

    if (!completion) {
      console.error('Unexpected OpenAI response format:', response.data)
      return NextResponse.json(
        { error: 'Failed to generate completion.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      completion,
      model,
      usage: {
        prompt_tokens: response.data.usage?.prompt_tokens,
        completion_tokens: response.data.usage?.completion_tokens,
        total_tokens: response.data.usage?.total_tokens,
      },
    })
  } catch (error) {
    // Handle OpenAI API errors
    if (error instanceof Error) {
      const errorMessage = error.message

      // Handle authentication errors
      if (errorMessage.includes('401') || errorMessage.includes('authentication')) {
        console.error('OpenAI authentication error:', error)
        return NextResponse.json(
          { error: 'OpenAI authentication failed. Invalid or expired API key.' },
          { status: 401 }
        )
      }

      // Handle rate limit errors
      if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        console.error('OpenAI rate limit error:', error)
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }

      // Handle other OpenAI errors
      if (errorMessage.includes('OpenAI')) {
        console.error('OpenAI API error:', error)
        return NextResponse.json(
          { error: `OpenAI API error: ${errorMessage}` },
          { status: 500 }
        )
      }
    }

    // Handle unexpected errors
    console.error('Unexpected error in OpenAI route:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
