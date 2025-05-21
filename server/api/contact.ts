import { RateLimiterMemory } from 'rate-limiter-flexible'
import { H3Event, getHeader, getHeaders, readBody, createError, sendError } from 'h3'

const limiter = new RateLimiterMemory({
  points: 1,
  duration: 60,
})

function getRequestIP(event: H3Event) {
  const forwarded = getHeader(event, 'x-forwarded-for')
  return forwarded?.split(',')[0] ?? event.node.req.socket.remoteAddress ?? 'unknown'
}

export default defineEventHandler(async (event) => {
  try {
    const ip = getRequestIP(event)
    await limiter.consume(ip)

    const body = await readBody(event)
    const { name, email, message } = body || {}

    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing name, email, or message',
      })
    }

    const headers = getHeaders(event)
    const origin = headers.origin || ''
    if (!origin.includes('localhost') && !origin.includes('portfolio-six-omega-53.vercel.app')) {
      throw createError({ statusCode: 403, statusMessage: 'Unauthorized origin' })
    }

    const config = useRuntimeConfig()
    const pushoverToken = config.PUSHOVER_API_TOKEN
    const pushoverUser = config.PUSHOVER_USER_KEY

    if (!pushoverToken || !pushoverUser) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Pushover credentials missing in environment',
      })
    }

    const fullMessage = `📨 Contact Form Message:\nFrom: ${name} (${email})\n${message}`

    const formData = new URLSearchParams({
      token: pushoverToken,
      user: pushoverUser,
      message: fullMessage,
    })

    const res = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw createError({
        statusCode: 502,
        statusMessage: `Pushover error: ${errorText}`,
      })
    }

    return { success: true }

  } catch (error) {
    console.error('❌ API error:', error)
    return sendError(event, error as Error)
  }
})
