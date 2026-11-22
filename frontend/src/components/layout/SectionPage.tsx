import { useEffect } from 'react'
import { sectionById, type SectionId } from '@/app/sections.ts'

type SectionPageProps = {
  sectionId: SectionId
}

export function SectionPage({ sectionId }: SectionPageProps) {
  const section = sectionById(sectionId)

  useEffect(() => {
    document.title = `${section.title} · BreatheWise AI`
  }, [section.title])

  return (
    <article className="section">
      <p className="eyebrow">Architecture shell</p>
      <h1>{section.title}</h1>
      <p className="purpose">{section.purpose}</p>
      <h2>This section will</h2>
      <ul>
        {section.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="note">
        The route is connected. Measurements, maps, and calculations for this section are not
        built yet, so none are shown.
      </p>
    </article>
  )
}
