interface Section {
  heading: string
  body:    string
}

interface LegalContentProps {
  effectiveDate: string
  sections:      Section[]
}

export function LegalContent({ effectiveDate, sections }: LegalContentProps) {
  return (
    <section className="bg-surface py-20 px-4">
      <div className="mx-auto max-w-3xl sm:px-6">
        <p className="mb-10 text-sm text-text-muted">Effective date: {effectiveDate}</p>
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="mb-3 text-lg font-bold text-navy">{s.heading}</h2>
              <p className="text-text-primary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-sm text-text-muted border-t border-border pt-6">
          ZeroD Agency · Naogaon, Rajshahi Division, Bangladesh ·{" "}
          <a href="mailto:hello@zerodagency.com" className="text-orange hover:underline">
            hello@zerodagency.com
          </a>
        </p>
      </div>
    </section>
  )
}
