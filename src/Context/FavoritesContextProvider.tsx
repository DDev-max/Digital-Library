'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { FavoritesContext } from './contextAPI'
import type { Item } from '../data/types'

interface FavoritesContextProviderProps {
  initialFavorites?: Item[]
  children: ReactNode
}

export function FavoritesContextProvider({ children, initialFavorites }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<Item[]>(initialFavorites || [])

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>
}
