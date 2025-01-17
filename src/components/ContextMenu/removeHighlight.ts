import type { HighlightedContentState } from "data/types"
import { spanCloseTag } from "../../data/consts"
import { getPreviousPlainText } from "../../Utils/getPreviousPlainText/getPreviousPlainText"
import type { CSSProperties, RefObject } from "react"
import { getParagraphIdx } from "./getParagraphIdx"

interface removeHighlightProps extends HighlightedContentState{
    fromHighlight: boolean
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    paragraphContainer: RefObject<HTMLDivElement>
}


export function removeHighlight({fromHighlight,highlightedContent,setHighlightedContent,setPosition,paragraphContainer}:removeHighlightProps) {         
        
    const range = window.getSelection()?.getRangeAt(0)
    const toRemoveTxt = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent

    const paragraphIdx = getParagraphIdx({paragraphContainer})
    
    
    if (!toRemoveTxt) return

    
    const classToSearch = range?.startContainer.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement).className ||  undefined     
    
    
    const spanOpenToSearch = `<span class="${classToSearch}">`

    const toSearch = spanOpenToSearch+toRemoveTxt+spanCloseTag

    const firstIdx = highlightedContent[paragraphIdx].indexOf(toSearch)
    const lastIdx =  highlightedContent[paragraphIdx].lastIndexOf(toSearch)


    if (firstIdx === -1) return

    if (firstIdx !== lastIdx){
        const fullPreviousContent = getPreviousPlainText(range?.startContainer.previousSibling)
        
        let nOcurrences = 1
        let fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt)
        

        while (fullPreviousIdx !== -1) {
            fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt, fullPreviousIdx + 1)
            nOcurrences++
        }
        

        let currentWord= 1
        let realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt)

        while (currentWord !== nOcurrences) {
            realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt, realIdx + 1)

            currentWord++
        }
                

        const firsPart = highlightedContent[paragraphIdx].slice(0, realIdx - spanOpenToSearch.length)

        const lastPart = highlightedContent[paragraphIdx].slice(realIdx + toRemoveTxt.length + spanCloseTag.length)

        if (fromHighlight) return firsPart+toRemoveTxt+lastPart

        const copy = [...highlightedContent]
        copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart

        setHighlightedContent(copy)
        return  
        
    }
    
    const firsPart = highlightedContent[paragraphIdx].slice(0, firstIdx)
    const lastPart = highlightedContent[paragraphIdx].slice(firstIdx+ spanOpenToSearch.length + toRemoveTxt?.length + spanCloseTag.length)
    
    const copy = [...highlightedContent]
    copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart
    

    if (fromHighlight) return firsPart+toRemoveTxt+lastPart


    setHighlightedContent(copy)
    setPosition({display: "none"})
    window.getSelection()?.removeAllRanges()

}