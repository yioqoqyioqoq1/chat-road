import clsx from 'clsx'
import Avatar from '@/components/ui/Avatar'
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

  return (
    <div className={clsx('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
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

      <div
        className={clsx(
          'max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-brand-600 text-white'
            : 'rounded-tl-sm bg-slate-800/80 text-slate-100',
          message.error && '!bg-red-500/15 text-red-300',
        )}
      >
        {message.content}
        {message.streaming && (
          <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-current align-middle" />
        )}
      </div>
    </div>
  )
}
