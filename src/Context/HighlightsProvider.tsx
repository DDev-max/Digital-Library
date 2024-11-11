import { ReactNode, useState } from "react"
import { HighlightedCntxt } from "./contextAPI"
import { Item } from "../data/types"



export function HighlightsProvider({children}: {children :ReactNode}) {

    const [alert, setAlert] = useState("")
    const [favorites, setFavorites] = useState<Item[]>([])

    

 
    return(
       <HighlightedCntxt.Provider value={{ alert, setAlert, favorites, setFavorites}}>
          {children}
       </HighlightedCntxt.Provider>
    )
 }
 