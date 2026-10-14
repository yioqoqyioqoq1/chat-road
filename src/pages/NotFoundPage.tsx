import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-6xl font-bold text-slate-700">404</p>
      <p className="text-slate-400">页面不存在</p>
      <Link
        to="/"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
      >
        返回首页
      </Link>
    </div>
  )
}
