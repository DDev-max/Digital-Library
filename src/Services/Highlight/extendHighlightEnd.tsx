import { HighlightEnd } from "../../types"

export function extendHighlightEnd({hasSpanClose, selectedParagraph, spanCloseTag,spanOpenTag, spanOpenRegex}:HighlightEnd){

    const htmlSelectionStart = hasSpanClose!.index

    const htmlSelectionEnd = htmlSelectionStart + hasSpanClose![0].length

    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

    const noSpanClose = htmlSelection.replace(spanCloseTag, "")

    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)

    const lastPart = selectedParagraph.slice(htmlSelectionEnd)

    const existingSpanOpen = spanOpenRegex.exec(firstPart)


    const newHMTL = existingSpanOpen[0] == spanOpenTag
    ? firstPart+noSpanClose+spanCloseTag+lastPart
    : firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart


//HACERLE LO MISMO AL START 👆 ?
    

//ERROR: 

    return newHMTL
}