export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  createdAt: number
  /** 是否处于流式输出中（用于展示光标、禁用输入） */
  streaming?: boolean
  /** 是否输出失败 */
  error?: boolean
}
