import { HighlightStart } from "../types"


export function extendHighlightStart({hasSpanOpen,selectedParagraph,spanCloseTag,spanOpenRegex,spanOpenTag}:HighlightStart){

    const htmlSelectionStart = hasSpanOpen!.index
    const htmlSelectionEnd = htmlSelectionStart + hasSpanOpen![0].length

    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

    const searchSpan = spanOpenRegex.exec(htmlSelection)
    if (!searchSpan) return

    const presentSpan = htmlSelection.slice(searchSpan?.index, searchSpan?.index + searchSpan?.[0].length)

    

    const noOpenTag = htmlSelection.replace(spanOpenRegex, "")

    const newHighlight = `${spanOpenTag}${noOpenTag}${spanCloseTag}`

    
    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)
    const lastPart= selectedParagraph.slice(htmlSelectionEnd)
    
    const newHtml = firstPart+newHighlight+presentSpan+lastPart


    return newHtml
}