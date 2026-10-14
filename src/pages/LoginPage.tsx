import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SparklesIcon } from '@/components/icons'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const token = useAuthStore((state) => state.token)
  const login = useAuthStore((state) => state.login)
  const loading = useAuthStore((state) => state.loading)
  const error = useAuthStore((state) => state.error)
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  if (token) {
    return <Navigate to="/" replace />
  }

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.trim() || !password.trim()) {
      setFormError('请输入用户名和密码')
      return
    }
    setFormError('')
    const ok = await login(username.trim())
    if (ok) {
      navigate(from, { replace: true })
    }
  }

  const message = formError || error

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <div className="flex items-center gap-2">
          <SparklesIcon className="text-brand-400" />
          <h1 className="text-lg font-bold tracking-tight">
            Chat<span className="text-brand-400">Road</span>
          </h1>
        </div>
        <p className="mt-2 text-sm text-slate-400">登录后即可与 AI 角色开始对话</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="mb-1 block text-sm text-slate-300">
              用户名
            </label>
            <input
              id="username"
              value={username}
              autoComplete="username"
              placeholder="任意用户名，例如 yio"
              onChange={(event) => {
                setUsername(event.target.value)
                setFormError('')
              }}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-600 focus:border-brand-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
              密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="任意密码"
              onChange={(event) => {
                setPassword(event.target.value)
                setFormError('')
              }}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-600 focus:border-brand-500"
            />
          </div>

          {message && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? '登录中…' : '登录'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          演示模式：任意用户名 / 密码即可登录
        </p>
      </div>
    </div>
  )
}
