import { spanCloseTag } from "data/consts"
import type { extendHighlight } from "data/types"


interface extendHighlightStartProps extends extendHighlight{
    matchedOpeningSpan: RegExpExecArray | null
    spanOpenRegex: RegExp
}


export function extendHighlightStart({matchedOpeningSpan,selectedParagraphHtml,spanOpenRegex,spanOpenTag}:extendHighlightStartProps){

    if(!matchedOpeningSpan) return
    const htmlSelectionStart = matchedOpeningSpan.index
    
    const htmlSelectionEnd = htmlSelectionStart + matchedOpeningSpan[0].length

    const htmlSelection = selectedParagraphHtml.slice(htmlSelectionStart, htmlSelectionEnd)

    const searchSpan = spanOpenRegex.exec(htmlSelection)
    if (!searchSpan) return

    const presentSpan = htmlSelection.slice(searchSpan?.index, searchSpan?.index + searchSpan?.[0].length)

    
    const sameColor = htmlSelection.includes(spanOpenTag)

    const noOpenTag = htmlSelection.replace(spanOpenRegex, "")


    const newHighlight = sameColor
    ? `${spanOpenTag}${noOpenTag}`
    : `${spanOpenTag}${noOpenTag}${spanCloseTag}`

    
    const firstPart = selectedParagraphHtml.slice(0, htmlSelectionStart)
    const lastPart= selectedParagraphHtml.slice(htmlSelectionEnd)
    
    const newHtml = sameColor
    ? firstPart+newHighlight+lastPart
    : firstPart+newHighlight+presentSpan+lastPart
        

    return newHtml
}