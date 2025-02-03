import { regexSpecialCharacters, spanCloseTag, spanOpenRegex } from "../../../data/consts"
import { getPreviousContent } from "Utils/getPreviousContent/getPreviousContent"

interface removeHighlightProps {
    highlightToRemove: string
    spanOpenHighlight: string
    htmlParagraph: string
}


export function removeHighlight({ highlightToRemove, spanOpenHighlight, htmlParagraph }: removeHighlightProps) {


    const toSearch = spanOpenHighlight + highlightToRemove + spanCloseTag

    const firstIdx = htmlParagraph.indexOf(toSearch)
    const lastIdx = htmlParagraph.lastIndexOf(toSearch)

    if (firstIdx === -1) return

    if (firstIdx === lastIdx) {
        const firsPart = htmlParagraph.slice(0, firstIdx)
        const lastPart = htmlParagraph.slice(firstIdx + spanOpenHighlight.length + highlightToRemove.length + spanCloseTag.length)


        return firsPart + highlightToRemove + lastPart
    }

    const escapedHighlight = new RegExp(highlightToRemove.replace(regexSpecialCharacters, '\\$&'))
    const globalEscapedHighlight = new RegExp(highlightToRemove.replace(regexSpecialCharacters, '\\$&'), 'g')


    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlParagraph
    if (!tempDiv.textContent) return

    const range = window.getSelection()?.getRangeAt(0)
    if (!range?.startContainer.parentElement?.previousSibling) return

    const { fullPreviousHtml, fullPreviousPlainText } = getPreviousContent(range.startContainer.parentElement.previousSibling)
    if (!fullPreviousHtml || !fullPreviousPlainText) return


    const matchNumPlainTxt = Array.from(tempDiv.textContent.matchAll(globalEscapedHighlight)).findIndex(elmnt => elmnt.index === fullPreviousPlainText.length)

    let matchNumHtml = matchNumPlainTxt
    const matchSpanTagHtml = Array.from(fullPreviousHtml.matchAll(spanOpenRegex))

    matchSpanTagHtml.forEach((el) => {
        if ((el[0].match(escapedHighlight))) {
            matchNumHtml++
        }
    })

    if (spanOpenHighlight.includes(highlightToRemove)) {
        matchNumHtml++
    }


    const firstIdxHtml = Array.from(htmlParagraph.matchAll(globalEscapedHighlight))[matchNumHtml].index

    const firsPart = htmlParagraph.slice(0, firstIdxHtml - spanOpenHighlight.length)
    const lastPart = htmlParagraph.slice(firstIdxHtml + highlightToRemove.length + spanCloseTag.length)


    return firsPart + highlightToRemove + lastPart



}

