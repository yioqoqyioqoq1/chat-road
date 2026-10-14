export interface Character {
  id: string
  name: string
  /** 一句话简介 */
  tagline: string
  description: string
  tags: string[]
  /** 开场白，进入聊天时作为首个 AI 消息 */
  greeting: string
  /** Tailwind 渐变色 class，用于封面与头像兜底背景 */
  accent: string
  avatar: string
  chatCount: number
}
