import { ReactNode, useEffect, useState } from "react"
import { URLorem } from "../data/consts"
import { HighlightedCntxt } from "../contextAPI"
import { useQuery } from "@tanstack/react-query"
import { Item } from "../data/types"
import { fetchFn } from "../Utils/fetchFn"

export function HighlightsProvider({children}: {children :ReactNode}) {

    const [highlightedContent, setHighlightedContent] = useState<string[]>([])
    const [alert, setAlert] = useState("")

    const [favorites, setFavorites] = useState<Item[]>([])


    const {data} = useQuery({
       queryKey: ["LoremIpsumm", URLorem],
       queryFn: ()=> fetchFn<string[]>(URLorem)
   })
 
   useEffect(()=>{
    if (data) {
         
      setHighlightedContent(data)       
       
      }
    
   }, [data])
 
 
    return(
       <HighlightedCntxt.Provider value={{highlightedContent, setHighlightedContent, alert, setAlert}}>
          {children}
       </HighlightedCntxt.Provider>
    )
 }
 