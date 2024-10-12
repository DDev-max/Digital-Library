import { HighlightEnd } from "../../types"

export function extendHighlightEnd({hasSpanClose, selectedParagraph, spanCloseTag,spanOpenTag}:HighlightEnd){
    const htmlSelectionStart = hasSpanClose!.index

    const htmlSelectionEnd = htmlSelectionStart + hasSpanClose![0].length

    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

    const noSpanClose = htmlSelection.replace(spanCloseTag, "")

    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)

    const lastPart = selectedParagraph.slice(htmlSelectionEnd)

    const newHMTL = firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart

    return newHMTL
}