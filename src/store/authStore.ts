import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as loginApi } from '@/api/auth'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  login: (username: string) => Promise<boolean>
  logout: () => void
}

/**
 * 鉴权状态。使用 zustand + persist 中间件把 token / 用户信息
 * 持久化到 localStorage，刷新页面后仍保持登录态。
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (username) => {
        set({ loading: true, error: null })
        try {
          const { token, user } = await loginApi(username)
          set({ token, user, loading: false })
          return true
        } catch (err) {
          set({ loading: false, error: err instanceof Error ? err.message : '登录失败' })
          return false
        }
      },

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'chat-road-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
)
