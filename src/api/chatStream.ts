import { buildReply, tokenize } from '@/mock/reply'

export interface ChatStreamMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface StreamChatParams {
  characterId: string
  messages: ChatStreamMessage[]
  signal?: AbortSignal
  onDelta: (delta: string) => void
}

const ENDPOINT = '/api/chat/stream'

/**
 * 流式聊天请求：通过 fetch + ReadableStream 手动解析 SSE 报文，
 * 每收到一段 delta 就回调给上层（逐字渲染）。
 *
 * 若接口不可用（例如纯静态部署没有 mock 服务），自动降级为前端本地模拟，
 * 保证演示环境始终可用。
 */
export async function streamChat({
  characterId,
  messages,
  signal,
  onDelta,
}: StreamChatParams): Promise<void> {
  let response: Response
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterId, messages }),
      signal,
    })
  } catch {
    await simulateStream(characterId, messages, onDelta, signal)
    return
  }

  if (!response.ok || !response.body) {
    await simulateStream(characterId, messages, onDelta, signal)
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split('\n\n')
      buffer = events.pop() ?? ''

      for (const event of events) {
        const payload = parseSseData(event)
        if (payload === null || payload === '[DONE]') continue
        const delta = readDelta(payload)
        if (delta) onDelta(delta)
      }
    }
  } finally {
    reader.releaseLock()
  }
}

function parseSseData(event: string): string | null {
  const dataLine = event.split('\n').find((line) => line.trim().startsWith('data:'))
  if (!dataLine) return null
  return dataLine.trim().slice(5).trim()
}

function readDelta(payload: string): string | null {
  try {
    const parsed = JSON.parse(payload) as { delta?: string }
    return parsed.delta ?? null
  } catch {
    return null
  }
}

async function simulateStream(
  characterId: string,
  messages: ChatStreamMessage[],
  onDelta: (delta: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const lastUser = [...messages].reverse().find((item) => item.role === 'user')
  const tokens = tokenize(buildReply(characterId, lastUser?.content ?? ''))

  for (const token of tokens) {
    if (signal?.aborted) return
    onDelta(token)
    await new Promise((resolve) => window.setTimeout(resolve, 24))
  }
}
