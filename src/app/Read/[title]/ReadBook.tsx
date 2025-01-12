"use client"

import { Alert } from "@/components/Alert/Alert";
import { ContxtMenu } from "@/components/ContextMenu/ContxtMenu"
import { dataParagraphIdx } from "data/consts";
import { useRef, useState } from "react"


export function ReadBook({ plainBookContent }: {plainBookContent: string[]}) {    

    const [highlightedContent, setHighlightedContent] = useState(plainBookContent)
    const [alert, setAlert] = useState("")

    const paragraphContainerRef =  useRef<HTMLDivElement>(null)

    return ( 
        <div 
        ref={paragraphContainerRef}
        className="readBook_paragraphsContainer"
        // 👇 to avoid an error when selecting the whole paragraph by triple-clicking on it
        onMouseDown={(e)=>{if (e.detail >= 3) e.preventDefault()}}>

            <ContxtMenu 
            paragraphContainer={paragraphContainerRef}
            setAlert={setAlert} 
            highlightedContent={highlightedContent} 
            setHighlightedContent={setHighlightedContent} />
            
            {highlightedContent?.map((elmnt, pIndex) => {

                return (
                    <p 
                    dangerouslySetInnerHTML={{ __html: elmnt }}  {...{[dataParagraphIdx]: pIndex}} key={pIndex}>
                    </p>
                )
            })}

            <Alert alert={alert}/>

        </div>
    )
}