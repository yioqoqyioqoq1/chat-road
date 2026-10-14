import { NavLink } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import { getCharacterById } from '@/data/characters'
import { useChatStore } from '@/store/chatStore'

interface ConversationListProps {
  onNavigate?: () => void
}

/**
 * 最近会话列表。只订阅「会话 key 的拼接字符串」，
 * 避免流式输出期间每个 token 都触发侧栏 re-render。
 */
export default function ConversationList({ onNavigate }: ConversationListProps) {
  const keyString = useChatStore((state) => Object.keys(state.messagesByCharacter).join('|'))
  const ids = keyString ? keyString.split('|') : []

  return (
    <div className="flex min-h-0 flex-1 flex-col border-t border-slate-800">
      <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        最近会话
      </p>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        {ids.length === 0 ? (
          <p className="px-1 py-2 text-xs text-slate-600">还没有会话，去角色广场逛逛吧</p>
        ) : (
          <ul className="space-y-1">
            {ids.map((id) => {
              const character = getCharacterById(id)
              if (!character) return null
              return (
                <li key={id}>
                  <NavLink
                    to={`/chat/${id}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-lg px-2 py-2 transition-colors',
                        isActive
                          ? 'bg-brand-500/15 text-brand-300'
                          : 'text-slate-300 hover:bg-slate-800/70',
                      ].join(' ')
                    }
                  >
                    <Avatar
                      src={character.avatar}
                      alt={character.name}
                      gradient={character.accent}
                      className="h-8 w-8 shrink-0 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm">{character.name}</p>
                      <p className="truncate text-xs text-slate-500">{character.tagline}</p>
                    </div>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
