"use client"

import { ReactNode, useState } from "react"
import { HighlightedCntxt } from "./contextAPI"
import type { Item } from "../data/types"


//CAMBIAR NOMBRE POR QUE NADA QUE VER
export function HighlightsProvider({children}: {children :ReactNode}) {

    const [alert, setAlert] = useState("")
    const [favorites, setFavorites] = useState<Item[]>([])

    

 
    return(
       <HighlightedCntxt.Provider value={{ alert, setAlert, favorites, setFavorites}}>
          {children}
       </HighlightedCntxt.Provider>
    )
 }
 