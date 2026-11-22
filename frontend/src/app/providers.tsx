import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router.tsx'

export function AppProviders() {
  return <RouterProvider router={router} />
}
