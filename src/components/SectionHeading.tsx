interface SectionHeadingProps {
  eyebrow: string
  title: string
  titleId: string
  description?: string
}

export function SectionHeading({ eyebrow, title, titleId, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
      <h2 id={titleId} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
