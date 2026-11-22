import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell.tsx'
import { NotFoundPage } from '@/components/layout/NotFoundPage.tsx'
import { RouteError } from '@/components/layout/RouteError.tsx'
import { AirPrintPage } from '@/features/airprint/AirPrintPage.tsx'
import { AtmospherePage } from '@/features/atmosphere/AtmospherePage.tsx'
import { BreatheAiPage } from '@/features/breathe-ai/BreatheAiPage.tsx'
import { CityLensPage } from '@/features/city-lens/CityLensPage.tsx'
import { CleanRoutePage } from '@/features/clean-route/CleanRoutePage.tsx'
import { CommunityPage } from '@/features/community/CommunityPage.tsx'
import { ForecastPage } from '@/features/forecast/ForecastPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <AtmospherePage /> },
      { path: 'airprint', element: <AirPrintPage /> },
      { path: 'city-lens', element: <CityLensPage /> },
      { path: 'forecast', element: <ForecastPage /> },
      { path: 'breathe-ai', element: <BreatheAiPage /> },
      { path: 'clean-route', element: <CleanRoutePage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
