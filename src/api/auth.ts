import type { User } from '@/types/user'
import { textToImage } from '@/utils/image'

export interface LoginResult {
  token: string
  user: User
}

/**
 * 模拟登录接口。
 *
 * 真实项目中这里替换为一次 HTTP 请求即可，例如：
 *   return http.post<LoginResult>('/auth/login', { username, password })
 * 当前用 Promise + 延时模拟网络请求，保证前端可独立运行、便于演示。
 */
export function login(username: string): Promise<LoginResult> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        token: `mock-token.${Date.now()}`,
        user: {
          id: 'u_1001',
          name: username,
          email: `${username}@chat-road.dev`,
          avatar: textToImage(
            `minimal flat vector avatar of a friendly developer named ${username}, soft purple gradient`,
          ),
          bio: '热爱前端与交互体验',
        },
      })
    }, 600)
  })
}
