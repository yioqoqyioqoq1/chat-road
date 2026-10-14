import { useState } from 'react'
import clsx from 'clsx'

interface AvatarProps {
  src: string
  alt: string
  /** Tailwind 渐变 class，图片加载失败时作为兜底背景 */
  gradient?: string
  className?: string
}

export default function Avatar({
  src,
  alt,
  gradient = 'from-brand-500 to-fuchsia-500',
  className,
}: AvatarProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-gradient-to-br',
        gradient,
        className,
      )}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white/90">
          {alt.slice(0, 1)}
        </span>
      )}
    </div>
  )
}
