import { NavLink } from 'react-router-dom'
import { CompassIcon, LogoutIcon, SparklesIcon } from '@/components/icons'
import { useAuthStore } from '@/store/authStore'

const NAV_ITEMS = [{ to: '/', label: '角色广场', icon: CompassIcon, end: true }]

interface SidebarProps {
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="flex h-full flex-col bg-slate-900/60">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
        <SparklesIcon className="text-brand-400" />
        <span className="text-lg font-bold tracking-tight">
          Chat<span className="text-brand-400">Road</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-brand-500/15 text-brand-300'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100',
              ].join(' ')
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-slate-800 p-3">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-9 w-9 rounded-full border border-slate-700 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-slate-200">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="退出登录"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
            >
              <LogoutIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-500">未登录</p>
        )}
      </div>
    </div>
  )
}
