import { ReactNode, useEffect, useState } from "react"
import { HighlightedCntxt } from "./contextAPI"
import { Item } from "../data/types"
import { useLorem } from "../hooks/useLorem"



export function HighlightsProvider({children}: {children :ReactNode}) {

    const [highlightedContent, setHighlightedContent] = useState<string[]>([])
    const [alert, setAlert] = useState("")
    const [favorites, setFavorites] = useState<Item[]>([])

    
    const {data} = useLorem()
 
   useEffect(()=>{
    if (data) setHighlightedContent(data)       
   }, [data])
 
 
    return(
       <HighlightedCntxt.Provider value={{highlightedContent, setHighlightedContent, alert, setAlert, favorites, setFavorites}}>
          {children}
       </HighlightedCntxt.Provider>
    )
 }
 