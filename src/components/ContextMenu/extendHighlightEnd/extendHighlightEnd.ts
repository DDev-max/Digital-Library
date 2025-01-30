import { spanCloseTag, spanOpenRegex } from "data/consts"
import type { extendHighlight } from "data/types"

interface extendHighlightEndProps extends Pick<extendHighlight, "spanOpenTag">{
    matchedClosingSpan: RegExpExecArray | null
}


export function extendHighlightEnd({matchedClosingSpan,spanOpenTag}:extendHighlightEndProps){
    
    //VERIFICAR ANTES DE LLAMAR 👇, PARA NO TESTEARLO AUQI
    if (!matchedClosingSpan) return
    
    const noSpanClose = matchedClosingSpan[0].replace(spanCloseTag, "")

    const htmlSelectionStart = matchedClosingSpan.index
    const htmlSelectionEnd = htmlSelectionStart + matchedClosingSpan[0].length

    const firstPart = matchedClosingSpan.input.slice(0, htmlSelectionStart)
    const lastPart = matchedClosingSpan.input.slice(htmlSelectionEnd)

    const existingSpanOpen = firstPart.match(spanOpenRegex)
    if(!existingSpanOpen) return
    

    const newHMTL = existingSpanOpen[existingSpanOpen.length - 1] == spanOpenTag
    ? firstPart+noSpanClose+spanCloseTag+lastPart
    : firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart

    return newHMTL
}