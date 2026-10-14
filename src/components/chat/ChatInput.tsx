import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { SendIcon } from '@/components/icons'

interface ChatInputProps {
  disabled?: boolean
  onSend: (text: string) => void
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState('')

  const submit = () => {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="shrink-0 border-t border-slate-800 bg-slate-950/80 p-3">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <textarea
          value={value}
          rows={1}
          placeholder="输入消息，Enter 发送，Shift + Enter 换行"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-600 focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label="发送"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
