import { ReactNode, useEffect, useState } from "react"
import { URLorem } from "../consts"
import { HighlightedCntxt } from "../contextAPI"
import { useQuery } from "@tanstack/react-query"
import { fetchLorem } from "../Services/fetchLorem"

export function HighlightsProvider({children}: {children :ReactNode}) {

    const [highlightedContent, setHighlightedContent] = useState<string[]>([])
    const [alert, setAlert] = useState("")


    const {data} = useQuery<string[]>({
       queryKey: ["LoremIpsumm", URLorem],
       queryFn: fetchLorem
   })
 
   useEffect(()=>{
    if (data) {
      // const htmlData: string[] = []

      // data.forEach(elmnt=>{
      //    htmlData.push(`<p>${elmnt}</p>`)
      // })

         
      setHighlightedContent(data)       
       
      }
    
   }, [data])
 
 
    return(
       <HighlightedCntxt.Provider value={{highlightedContent, setHighlightedContent, alert, setAlert}}>
          {children}
       </HighlightedCntxt.Provider>
    )
 }
 