export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="bg-grid absolute inset-0" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
    </div>
  )
}
