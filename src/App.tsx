import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">
          加载中…
        </div>
      }
    />
  )
}
