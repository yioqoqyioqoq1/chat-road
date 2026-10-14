import { Link } from 'react-router-dom'
import { LogoutIcon, MenuIcon, UserIcon } from '@/components/icons'
import { useAuthStore } from '@/store/authStore'

interface HeaderProps {
  onOpenMenu: () => void
}

export default function Header({ onOpenMenu }: HeaderProps) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="打开菜单"
        className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 lg:hidden"
      >
        <MenuIcon />
      </button>

      <span className="text-sm font-medium text-slate-300">AI 角色聊天</span>

      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <>
            <span className="hidden text-sm text-slate-300 sm:block">{user.name}</span>
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full border border-slate-700 object-cover"
            />
            <button
              type="button"
              onClick={logout}
              aria-label="退出登录"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
            >
              <LogoutIcon className="h-4 w-4" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
          >
            <UserIcon className="h-4 w-4" />
            登录
          </Link>
        )}
      </div>
    </header>
  )
}
