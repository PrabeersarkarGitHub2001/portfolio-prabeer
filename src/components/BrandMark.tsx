import { useId } from 'react'
import { cn } from '../lib/cn'

export function BrandMark({ className }: { className?: string }) {
  const id = useId()
  const tile = `${id}-tile`
  const sheen = `${id}-sheen`

  return (
    <svg viewBox="0 0 40 40" className={cn('h-10 w-10', className)} aria-hidden="true">
      <defs>
        <linearGradient id={tile} x1="4" y1="2" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7ea6ff" />
          <stop offset="0.5" stopColor="#3a68e0" />
          <stop offset="1" stopColor="#1a2f8f" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill={`url(#${tile})`} />
      <path d="M12 0h16a12 12 0 0 1 12 12v8H0v-8A12 12 0 0 1 12 0Z" fill={`url(#${sheen})`} />
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="1.5" />
      <g fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 29V11h5a4.5 4.5 0 0 1 0 9h-5" />
        <path d="M32 13.4c-1-1.5-2.6-2.4-4.5-2.4-2.4 0-4 1.4-4 3.4 0 4.6 9 2.6 9 9.2 0 3.3-2.4 5.4-5.4 5.4-2 0-3.7-.8-4.6-2.2" />
      </g>
      <circle cx="33" cy="6.8" r="2.3" fill="#b7f0cf" stroke="#1a2f8f" strokeWidth="1" />
    </svg>
  )
}
