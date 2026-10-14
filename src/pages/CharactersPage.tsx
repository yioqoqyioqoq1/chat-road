import { useMemo, useState } from 'react'
import CharacterCard from '@/components/character/CharacterCard'
import { SearchIcon } from '@/components/icons'
import { CHARACTERS } from '@/data/characters'

function TagChip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-brand-500/20 px-3 py-1 text-xs text-brand-300'
          : 'rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200'
      }
    >
      {children}
    </button>
  )
}

export default function CharactersPage() {
  const [keyword, setKeyword] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => Array.from(new Set(CHARACTERS.flatMap((item) => item.tags))), [])

  const list = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    return CHARACTERS.filter((character) => {
      const matchTag = !activeTag || character.tags.includes(activeTag)
      const matchKeyword =
        !kw ||
        character.name.toLowerCase().includes(kw) ||
        character.tagline.toLowerCase().includes(kw) ||
        character.description.toLowerCase().includes(kw)
      return matchTag && matchKeyword
    })
  }, [keyword, activeTag])

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold">角色广场</h1>
          <p className="mt-1 text-sm text-slate-400">挑选一个角色，开始一段新的对话</p>
        </header>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-72">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索角色名称 / 简介"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-slate-600 focus:border-brand-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <TagChip active={activeTag === null} onClick={() => setActiveTag(null)}>
              全部
            </TagChip>
            {allTags.map((tag) => (
              <TagChip key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
                {tag}
              </TagChip>
            ))}
          </div>
        </div>

        {list.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-slate-500">
            没有找到匹配的角色，换个关键词试试
          </p>
        )}
      </div>
    </div>
  )
}
