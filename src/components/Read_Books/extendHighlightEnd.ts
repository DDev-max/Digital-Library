import { spanCloseTag } from "data/consts"
import type { extendHighlight } from "data/types"

interface extendHighlightEndProps extends extendHighlight{
    hasSpanClose: RegExpExecArray | null
    spanOpenRegex: RegExp
}


export function extendHighlightEnd({hasSpanClose, selectedParagraph,spanOpenTag, spanOpenRegex}:extendHighlightEndProps){
    
    if (!hasSpanClose) return
    const htmlSelectionStart = hasSpanClose.index

    const htmlSelectionEnd = htmlSelectionStart + hasSpanClose[0].length

    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

    const noSpanClose = htmlSelection.replace(spanCloseTag, "")

    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)

    const lastPart = selectedParagraph.slice(htmlSelectionEnd)

    const existingSpanOpen = firstPart.match(spanOpenRegex)
    if(!existingSpanOpen) return
    

    const newHMTL = existingSpanOpen[existingSpanOpen.length - 1] == spanOpenTag
    ? firstPart+noSpanClose+spanCloseTag+lastPart
    : firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart


    return newHMTL
}