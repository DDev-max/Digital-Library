import { spanCloseTag } from "data/consts"
import type { extendHighlight } from "data/types"

interface extendHighlightEndProps extends extendHighlight{
    matchedClosingSpan: RegExpExecArray | null
    spanOpenRegex: RegExp
}


export function extendHighlightEnd({matchedClosingSpan, selectedParagraphHtml,spanOpenTag, spanOpenRegex}:extendHighlightEndProps){
    
    if (!matchedClosingSpan) return
    const htmlSelectionStart = matchedClosingSpan.index

    const htmlSelectionEnd = htmlSelectionStart + matchedClosingSpan[0].length

    const htmlSelection = selectedParagraphHtml.slice(htmlSelectionStart, htmlSelectionEnd)

    const noSpanClose = htmlSelection.replace(spanCloseTag, "")

    const firstPart = selectedParagraphHtml.slice(0, htmlSelectionStart)

    const lastPart = selectedParagraphHtml.slice(htmlSelectionEnd)

    const existingSpanOpen = firstPart.match(spanOpenRegex)
    if(!existingSpanOpen) return
    

    const newHMTL = existingSpanOpen[existingSpanOpen.length - 1] == spanOpenTag
    ? firstPart+noSpanClose+spanCloseTag+lastPart
    : firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart


    return newHMTL
}