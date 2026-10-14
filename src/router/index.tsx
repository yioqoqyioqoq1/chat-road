import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => ({ Component: (await import('@/pages/LoginPage')).default }),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/CharactersPage')).default }),
      },
      {
        path: 'character/:id',
        lazy: async () => ({ Component: (await import('@/pages/CharacterDetailPage')).default }),
      },
      {
        path: 'chat/:id',
        lazy: async () => ({ Component: (await import('@/pages/ChatPage')).default }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).default }),
      },
    ],
  },
])
