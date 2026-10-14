import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatInput from '@/components/chat/ChatInput'
import MessageList from '@/components/chat/MessageList'
import { ArrowLeftIcon, TrashIcon } from '@/components/icons'
import Avatar from '@/components/ui/Avatar'
import { streamChat } from '@/api/chatStream'
import { getCharacterById } from '@/data/characters'
import { useChatStore } from '@/store/chatStore'
import { createChatId } from '@/utils/id'
import type { ChatMessage } from '@/types/message'

const EMPTY: ChatMessage[] = []

export default function ChatPage() {
  const { id = '' } = useParams<{ id: string }>()
  const character = getCharacterById(id)

  const messages = useChatStore((state) => state.messagesByCharacter[id] ?? EMPTY)
  const ensureConversation = useChatStore((state) => state.ensureConversation)
  const appendMessage = useChatStore((state) => state.appendMessage)
  const appendDelta = useChatStore((state) => state.appendDelta)
  const finishMessage = useChatStore((state) => state.finishMessage)
  const failMessage = useChatStore((state) => state.failMessage)
  const setStreaming = useChatStore((state) => state.setStreaming)
  const clearConversation = useChatStore((state) => state.clearConversation)
  const streaming = useChatStore((state) => state.streamingCharacterId === id)

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (character) ensureConversation(character.id)
  }, [character, ensureConversation])

  // 离开页面时中断尚未完成的流式请求，避免内存泄漏
  useEffect(() => () => abortRef.current?.abort(), [])

  if (!character) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <p className="text-slate-400">角色不存在或已下架</p>
        <Link
          to="/"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
        >
          返回角色广场
        </Link>
      </div>
    )
  }

  const handleSend = async (text: string) => {
    if (streaming) return

    const userMessage: ChatMessage = {
      id: createChatId(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    const assistantMessage: ChatMessage = {
      id: createChatId(),
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      streaming: true,
    }

    appendMessage(character.id, userMessage)
    appendMessage(character.id, assistantMessage)
    setStreaming(character.id)

    const history = [...messages, userMessage].map((message) => ({
      role: message.role,
      content: message.content,
    }))

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await streamChat({
        characterId: character.id,
        messages: history,
        signal: controller.signal,
        onDelta: (delta) => appendDelta(character.id, assistantMessage.id, delta),
      })
      finishMessage(character.id, assistantMessage.id)
    } catch (error) {
      failMessage(
        character.id,
        assistantMessage.id,
        error instanceof Error ? error.message : '回复失败，请重试',
      )
    } finally {
      setStreaming(null)
      abortRef.current = null
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-800 px-4">
        <Link
          to={`/character/${character.id}`}
          aria-label="返回角色详情"
          className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800"
        >
          <ArrowLeftIcon />
        </Link>
        <Avatar
          src={character.avatar}
          alt={character.name}
          gradient={character.accent}
          className="h-8 w-8 shrink-0 rounded-full"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-100">{character.name}</p>
          <p className="truncate text-xs text-slate-500">
            {streaming ? '正在输入…' : character.tagline}
          </p>
        </div>
        <button
          type="button"
          onClick={() => clearConversation(character.id)}
          aria-label="清空对话"
          className="ml-auto rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </header>

      <MessageList messages={messages} character={character} />
      <ChatInput disabled={streaming} onSend={handleSend} />
    </div>
  )
}
