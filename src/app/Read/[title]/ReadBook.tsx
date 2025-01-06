"use client"

import { ContxtMenu } from "@/components/Read_Books/ContxtMenu"
import { ReadBookProps } from "data/types"
import { useState } from "react"


//DIGAMOS QUE LISTO: ✅
export function ReadBook({ plainBookContent }: ReadBookProps) {

    const [highlightedContent, setHighlightedContent] = useState<string[]>(plainBookContent)


//error raro aveces cuando hago extend
    return ( 
        <>
            <ContxtMenu highlightedContent={highlightedContent} setHighlightedContent={setHighlightedContent} />
            {highlightedContent?.map((elmnt, pIndex) => {

                return (
                    <p dangerouslySetInnerHTML={{ __html: elmnt }} data-index={pIndex} key={pIndex}>
                    </p>
                )
            })}
        </>
    )
}