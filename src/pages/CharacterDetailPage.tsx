import { Link, useParams } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import { ArrowLeftIcon, ChatIcon } from '@/components/icons'
import { getCharacterById } from '@/data/characters'

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const character = getCharacterById(id)

  if (!character) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <p className="text-slate-400">角色不存在或已下架</p>
        <Link
          to="/"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
        >
          返回角色广场
        </Link>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回角色广场
        </Link>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
          <div className={`h-28 bg-gradient-to-br ${character.accent}`} />

          <div className="px-5 pb-5">
            <div className="-mt-10 flex items-end gap-4">
              <Avatar
                src={character.avatar}
                alt={character.name}
                gradient={character.accent}
                className="h-20 w-20 shrink-0 rounded-2xl border-4 border-slate-900"
              />
              <div className="pb-1">
                <h1 className="text-xl font-semibold">{character.name}</h1>
                <p className="text-sm text-slate-400">{character.tagline}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">{character.description}</p>

            <div className="mt-4 rounded-xl bg-slate-950/60 p-4">
              <p className="mb-1 text-xs text-slate-500">开场白</p>
              <p className="text-sm text-slate-300">“{character.greeting}”</p>
            </div>

            <Link
              to={`/chat/${character.id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
            >
              <ChatIcon className="h-4 w-4" />
              开始聊天
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
