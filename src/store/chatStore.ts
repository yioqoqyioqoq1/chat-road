import { create } from 'zustand'
import { getCharacterById } from '@/data/characters'
import { createChatId } from '@/utils/id'
import type { ChatMessage } from '@/types/message'

interface ChatState {
  /** 按角色维度保存会话，切换角色不丢历史 */
  messagesByCharacter: Record<string, ChatMessage[]>
  /** 当前正在流式输出的角色 id（用于禁用输入框、展示状态） */
  streamingCharacterId: string | null

  ensureConversation: (characterId: string) => void
  appendMessage: (characterId: string, message: ChatMessage) => void
  appendDelta: (characterId: string, messageId: string, delta: string) => void
  finishMessage: (characterId: string, messageId: string) => void
  failMessage: (characterId: string, messageId: string, text: string) => void
  setStreaming: (characterId: string | null) => void
  clearConversation: (characterId: string) => void
}

export const useChatStore = create<ChatState>()((set) => ({
  messagesByCharacter: {},
  streamingCharacterId: null,

  ensureConversation: (characterId) =>
    set((state) => {
      if (state.messagesByCharacter[characterId]) return state
      const character = getCharacterById(characterId)
      const greeting: ChatMessage = {
        id: createChatId(),
        role: 'assistant',
        content: character?.greeting ?? '你好，很高兴见到你。',
        createdAt: Date.now(),
      }
      return {
        messagesByCharacter: { ...state.messagesByCharacter, [characterId]: [greeting] },
      }
    }),

  appendMessage: (characterId, message) =>
    set((state) => ({
      messagesByCharacter: {
        ...state.messagesByCharacter,
        [characterId]: [...(state.messagesByCharacter[characterId] ?? []), message],
      },
    })),

  appendDelta: (characterId, messageId, delta) =>
    set((state) => {
      const list = state.messagesByCharacter[characterId]
      if (!list) return state
      return {
        messagesByCharacter: {
          ...state.messagesByCharacter,
          [characterId]: list.map((message) =>
            message.id === messageId ? { ...message, content: message.content + delta } : message,
          ),
        },
      }
    }),

  finishMessage: (characterId, messageId) =>
    set((state) => {
      const list = state.messagesByCharacter[characterId]
      if (!list) return state
      return {
        messagesByCharacter: {
          ...state.messagesByCharacter,
          [characterId]: list.map((message) =>
            message.id === messageId ? { ...message, streaming: false } : message,
          ),
        },
      }
    }),

  failMessage: (characterId, messageId, text) =>
    set((state) => {
      const list = state.messagesByCharacter[characterId]
      if (!list) return state
      return {
        messagesByCharacter: {
          ...state.messagesByCharacter,
          [characterId]: list.map((message) =>
            message.id === messageId
              ? { ...message, content: message.content || text, streaming: false, error: true }
              : message,
          ),
        },
      }
    }),

  setStreaming: (characterId) => set({ streamingCharacterId: characterId }),

  clearConversation: (characterId) =>
    set((state) => {
      const next = { ...state.messagesByCharacter }
      delete next[characterId]
      return { messagesByCharacter: next }
    }),
}))
