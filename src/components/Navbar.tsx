import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { SectionId } from '../data/portfolio'
import { navItems, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/cn'
import { BrandMark } from './BrandMark'
import { ResumeLink } from './Links'

function getFocusable(menu: HTMLElement, toggle: HTMLButtonElement | null): HTMLElement[] {
  const items = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
  if (toggle) items.push(toggle)
  return items
}

export function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const menu = menuRef.current
    const firstLink = menu?.querySelector<HTMLElement>('a[href]')
    firstLink?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menu) return
      const items = getFocusable(menu, toggleRef.current)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = (id: SectionId, mobile: boolean) => {
    if (!mobile) return
    setOpen(false)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.focus({ preventScroll: true })
      })
    })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-5 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
          <a href="#home" className="brand-link flex items-center gap-3 rounded-full" aria-label={`${profile.name}, home`}>
            <BrandMark className="shrink-0 drop-shadow-[0_6px_18px_rgb(58_104_224/0.45)]" />
            <span className="font-display text-sm font-semibold tracking-wide sm:text-base">
              <span className="sm:hidden">Prabeer</span>
              <span className="hidden sm:inline">{profile.name}</span>
            </span>
          </a>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={() => navigate(item.id, false)}
                    className={cn(
                      'rounded-full px-3 py-2 text-sm transition-colors',
                      'magic-link',
                      active === item.id ? 'bg-white/10 text-ink' : 'text-muted',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ResumeLink label="Resume" compact />
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[#070b14]/70 lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={menuRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="mobile-nav fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-canvas px-5 py-4 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? 'location' : undefined}
                      onClick={() => navigate(item.id, true)}
                      className={cn(
                        'block rounded-xl px-3 py-3 text-base',
                        'magic-link',
                      active === item.id ? 'bg-white/10 text-ink' : 'text-muted',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ResumeLink label="Download Resume" className="mt-4 w-full" />
          </div>
        </>
      ) : null}
    </>
  )
}
