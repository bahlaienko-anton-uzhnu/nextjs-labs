'use client'

import { SessionProvider } from 'next-auth/react'
import { FavoritesProvider } from '@/contexts/FavoritesContext'

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </SessionProvider>
  )
}