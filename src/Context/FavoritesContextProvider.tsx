'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { FavoritesContext } from './contextAPI'
import type { Item } from '../data/types'

export function FavoritesContextProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Item[]>([])

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>
}
