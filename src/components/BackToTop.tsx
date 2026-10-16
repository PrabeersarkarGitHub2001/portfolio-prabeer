import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="icon-btn back-to-top fixed right-6 bottom-6 z-40 bg-canvas/90 shadow-[0_12px_40px_-20px_rgb(0_0_0/0.8)]"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
