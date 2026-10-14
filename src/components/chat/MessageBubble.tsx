import { useState } from 'react'
import clsx from 'clsx'
import Avatar from '@/components/ui/Avatar'
import MarkdownContent from './MarkdownContent'
import { CopyIcon } from '@/components/icons'
import { copyText } from '@/utils/clipboard'
import { formatTime } from '@/utils/time'
import { useAuthStore } from '@/store/authStore'
import type { Character } from '@/types/character'
import type { ChatMessage } from '@/types/message'

interface MessageBubbleProps {
  message: ChatMessage
  character: Character
}

export default function MessageBubble({ message, character }: MessageBubbleProps) {
  const user = useAuthStore((state) => state.user)
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)

  // 流式输出中先按纯文本渲染（避免半截 Markdown 抖动），结束后再渲染 Markdown
  const renderMarkdown = !isUser && !message.streaming && !message.error

  const handleCopy = async () => {
    if (await copyText(message.content)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className={clsx('group flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {isUser ? (
        <Avatar
          src={user?.avatar ?? ''}
          alt={user?.name ?? '我'}
          className="h-9 w-9 shrink-0 rounded-full"
        />
      ) : (
        <Avatar
          src={character.avatar}
          alt={character.name}
          gradient={character.accent}
          className="h-9 w-9 shrink-0 rounded-full"
        />
      )}

      <div className={clsx('flex max-w-[80%] flex-col', isUser ? 'items-end' : 'items-start')}>
        <div
          className={clsx(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'rounded-tr-sm bg-brand-600 text-white'
              : 'rounded-tl-sm bg-slate-800/80 text-slate-100',
            message.error && '!bg-red-500/15 text-red-300',
          )}
        >
          {renderMarkdown ? (
            <MarkdownContent content={message.content} />
          ) : (
            <span className="whitespace-pre-wrap break-words">{message.content}</span>
          )}
          {message.streaming && (
            <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-current align-middle" />
          )}
        </div>

        <div
          className={clsx(
            'mt-1 flex items-center gap-2 text-[11px] text-slate-500',
            isUser ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          <span>{formatTime(message.createdAt)}</span>
          {!isUser && !message.streaming && message.content && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 opacity-0 transition-opacity hover:text-slate-300 group-hover:opacity-100"
            >
              <CopyIcon className="h-3.5 w-3.5" />
              {copied ? '已复制' : '复制'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
