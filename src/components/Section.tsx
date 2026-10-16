import type { ReactNode } from 'react'
import type { SectionId } from '../data/portfolio'
import { cn } from '../lib/cn'

interface SectionProps {
  id: SectionId
  labelledBy: string
  children: ReactNode
  className?: string
}

export function Section({ id, labelledBy, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={cn('scroll-mt-24 py-20 md:py-28', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}
