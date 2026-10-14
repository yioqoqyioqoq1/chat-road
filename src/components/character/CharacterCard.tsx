import { Link } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import type { Character } from '@/types/character'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      to={`/character/${character.id}`}
      className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-brand-500/60 hover:bg-slate-900"
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={character.avatar}
          alt={character.name}
          gradient={character.accent}
          className="h-14 w-14 shrink-0 rounded-2xl"
        />
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-100 transition-colors group-hover:text-brand-300">
            {character.name}
          </h3>
          <p className="truncate text-xs text-slate-400">{character.tagline}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-400">{character.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {character.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{character.chatCount.toLocaleString()} 次对话</span>
        <span className="text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
          查看详情 →
        </span>
      </div>
    </Link>
  )
}
