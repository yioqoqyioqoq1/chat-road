import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Character } from '@/types/character'
import type { ChatMessage } from '@/types/message'

interface MessageListProps {
  messages: ChatMessage[]
  character: Character
}

export default function MessageList({ messages, character }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const last = messages[messages.length - 1]

  // 新消息或流式输出时，始终滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [last?.id, last?.content])

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} character={character} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
