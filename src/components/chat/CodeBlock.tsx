import { useRef, useState, type ReactNode } from 'react'
import { copyText } from '@/utils/clipboard'

interface CodeBlockProps {
  children?: ReactNode
}

/**
 * 代码块容器：在默认 <pre> 外增加「复制」按钮。
 * 语法高亮由 rehype-highlight 输出的 hljs class 完成，样式在 styles/index.css 中定义。
 */
export default function CodeBlock({ children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? ''
    if (await copyText(text)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="group/code relative my-3">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-[13px] leading-relaxed"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-slate-700 bg-slate-900/90 px-2 py-1 text-xs text-slate-400 opacity-0 transition-opacity hover:text-slate-200 group-hover/code:opacity-100"
      >
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  )
}
