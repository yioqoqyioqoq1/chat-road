import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@/components/icons'

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="h-full overflow-y-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-200"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        返回角色广场
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">角色详情</h1>
      <p className="mt-2 text-slate-400">角色 ID：{id}（详情内容下一阶段实现）。</p>
    </div>
  )
}
