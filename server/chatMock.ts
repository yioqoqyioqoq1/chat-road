import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { buildReply, tokenize } from '../src/mock/reply'

interface ChatRequestBody {
  characterId?: string
  messages?: { role: string; content: string }[]
}

function readJsonBody(req: IncomingMessage): Promise<ChatRequestBody> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf-8')
        resolve(raw ? (JSON.parse(raw) as ChatRequestBody) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function streamReply(res: ServerResponse, text: string) {
  const tokens = tokenize(text)
  let index = 0

  const timer = setInterval(() => {
    if (index >= tokens.length) {
      res.write('data: [DONE]\n\n')
      clearInterval(timer)
      res.end()
      return
    }
    res.write(`data: ${JSON.stringify({ delta: tokens[index] })}\n\n`)
    index += 1
  }, 28)

  res.on('close', () => clearInterval(timer))
}

async function handleChat(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end('Method Not Allowed')
    return
  }

  try {
    const body = await readJsonBody(req)
    const lastUser = [...(body.messages ?? [])].reverse().find((item) => item.role === 'user')
    const reply = buildReply(body.characterId ?? '', lastUser?.content ?? '')

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    })
    streamReply(res, reply)
  } catch {
    res.statusCode = 400
    res.end('Bad Request')
  }
}

/**
 * 开发 / 预览环境下的模拟聊天接口（SSE）。
 *
 *   POST /api/chat/stream   body: { characterId, messages }
 *   响应：text/event-stream，逐条 `data: {"delta":"..."}`，以 `data: [DONE]` 结束
 *
 * 生产环境由真实后端提供同名接口即可，前端代码无需改动。
 */
export function chatMockPlugin(): Plugin {
  return {
    name: 'chat-road-mock-api',
    configureServer(server) {
      server.middlewares.use('/api/chat/stream', (req, res) => {
        void handleChat(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/chat/stream', (req, res) => {
        void handleChat(req, res)
      })
    },
  }
}
