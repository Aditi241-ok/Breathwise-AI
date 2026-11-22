export const sections = [
  {
    id: 'atmosphere',
    path: '/',
    label: 'Atmosphere',
    title: 'Atmosphere',
    purpose:
      'Show the current air around a place: the index, six pollutant measurements, location, a plain-language status, and when the numbers were measured.',
    responsibilities: [
      'Current air-quality index, with the scale named beside the number',
      'PM2.5, PM10, NO2, SO2, O3, and CO kept as separate measurements',
      'Location, observation time, and data source',
      'A status written so it can be understood without knowing the index formula',
    ],
  },
  {
    id: 'airprint',
    path: '/airprint',
    label: 'AirPrint',
    title: 'AirPrint',
    purpose:
      'Estimate how a person’s day lines up with pollution, using time spent at each place. This is a concentration-time indicator, not an inhaled dose and not a diagnosis.',
    responsibilities: [
      'A daily schedule of locations and time intervals',
      'Indoor and outdoor activities marked separately',
      'Exposure compared across activities, with high periods called out',
      'Each pollutant calculated on its own, with missing concentrations left missing',
    ],
  },
  {
    id: 'city-lens',
    path: '/city-lens',
    label: 'City Lens',
    title: 'City Lens',
    purpose:
      'Place monitoring stations, hotspots, and local observations on a map so pollution can be read geographically.',
    responsibilities: [
      'An interactive map backed by station coordinates from the API',
      'Hotspots only where the data supports them',
      'Observations tied to a location rather than a city-wide average',
    ],
  },
  {
    id: 'forecast',
    path: '/forecast',
    label: 'Forecast Lab',
    title: 'Forecast Lab',
    purpose:
      'Show how air quality has moved, and how it may move next, without mixing measurements and predictions.',
    responsibilities: [
      'Historical series drawn from measured values',
      'Forecasts only when the source provides them',
      'Measured and predicted points labeled differently in the chart and the text',
    ],
  },
  {
    id: 'breathe-ai',
    path: '/breathe-ai',
    label: 'Breathe AI',
    title: 'Breathe AI',
    purpose:
      'Explain measurements, answer air-quality questions, and suggest practical precautions. The first assistant is rule-based and shows the rule it used.',
    responsibilities: [
      'Plain-language explanations of the current measurements',
      'Precautions tied to those measurements',
      'Reasons pollution can rise or fall, stated as explanations rather than certainties',
      'A single assistant interface that a later model can sit behind',
    ],
  },
  {
    id: 'clean-route',
    path: '/clean-route',
    label: 'CleanRoute',
    title: 'CleanRoute',
    purpose:
      'Compare two routes by the air-quality information available along them, and say plainly when a segment is estimated or missing.',
    responsibilities: [
      'Two routes entered and compared side by side',
      'A cleaner-route explanation based only on available data',
      'Missing and estimated segments disclosed on the route they belong to',
    ],
  },
  {
    id: 'community',
    path: '/community',
    label: 'Community AirWatch',
    title: 'Community AirWatch',
    purpose:
      'Collect local observations from people and show them as reports, separate from instrument measurements.',
    responsibilities: [
      'A report with location, category, description, and timestamp',
      'A feed of submitted observations',
      'Community reports never presented as monitor readings',
    ],
  },
] as const

export type SectionId = (typeof sections)[number]['id']
export type AppSection = (typeof sections)[number]

export function sectionById(id: SectionId): AppSection {
  const section = sections.find((item) => item.id === id)

  if (!section) {
    throw new Error(`Unknown section: ${id}`)
  }

  return section
}
