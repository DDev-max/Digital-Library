import { HighlightStart } from "../../data/types"


export function extendHighlightStart({hasSpanOpen,selectedParagraph,spanCloseTag,spanOpenRegex,spanOpenTag}:HighlightStart){

    const htmlSelectionStart = hasSpanOpen!.index
    const htmlSelectionEnd = htmlSelectionStart + hasSpanOpen![0].length

    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

    const searchSpan = spanOpenRegex.exec(htmlSelection)
    if (!searchSpan) return

    const presentSpan = htmlSelection.slice(searchSpan?.index, searchSpan?.index + searchSpan?.[0].length)

    
    const sameColor = htmlSelection.includes(spanOpenTag)

    const noOpenTag = htmlSelection.replace(spanOpenRegex, "")


    const newHighlight = sameColor
    ? `${spanOpenTag}${noOpenTag}`
    : `${spanOpenTag}${noOpenTag}${spanCloseTag}`

    
    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)
    const lastPart= selectedParagraph.slice(htmlSelectionEnd)
    
    const newHtml = sameColor
    ? firstPart+newHighlight+lastPart
    : firstPart+newHighlight+presentSpan+lastPart
        

    return newHtml
}