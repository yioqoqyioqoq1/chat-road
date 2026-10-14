import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    // 使用 100dvh 规避移动端浏览器地址栏导致的高度跳动
    <div className="flex h-[100dvh] overflow-hidden bg-slate-950 text-slate-100">
      {/* 桌面端固定侧栏 */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 lg:block">
        <Sidebar />
      </aside>

      {/* 移动端抽屉式侧栏 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-slate-800 bg-slate-900">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenMenu={() => setDrawerOpen(true)} />
        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
