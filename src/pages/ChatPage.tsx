import { useParams } from 'react-router-dom'

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="text-2xl font-semibold">聊天</h1>
      <p className="mt-2 text-slate-400">与角色 {id} 的对话界面（后续阶段实现）。</p>
    </div>
  )
}
