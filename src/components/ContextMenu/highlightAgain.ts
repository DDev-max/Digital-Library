import { emptySpanRegex, spanCloseRegex, spanOpenRegex } from "data/consts";
import { extendHighlightStart } from "./extendHighlightStart";
import { extendHighlightEnd } from "./extendHighlightEnd";
import { removeHighlight } from "./removeHighlight";
import { highlightPlainText } from "./highlightPlainText";
import type { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import { HighlightedContentState } from "data/types";

//sacar propr comunes

interface HighlightAgainProps extends HighlightedContentState {
    selectedParagraphHtml: string
    spanOpenTag: string
    paragraphContainer: RefObject<HTMLDivElement>
    fullPlainTxt: string | null
    setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>
}

export function highlightAgain({ selectedParagraphHtml, spanOpenTag, highlightedContent, paragraphContainer, setHighlightedContent, fullPlainTxt, setPosition }: HighlightAgainProps) {

    const userSeleccion =  window.getSelection()?.toString()
    if (!userSeleccion) return

    const regexSpecialCharacters = /[.*+?^${}()|[\]\\]/g

    let bothTags = true
    for (let i = 0; i <= userSeleccion.length; i++) {

        const selectionFirstPart = userSeleccion.slice(0, i);
        const selectionLastPart = userSeleccion.slice(i);

        const escapedFirstPart = selectionFirstPart.replace(regexSpecialCharacters, '\\$&')
        const escapedLastPart = selectionLastPart.replace(regexSpecialCharacters, '\\$&')

        const textSpanOpenRegex = new RegExp(`${escapedFirstPart}${spanOpenRegex.source}${escapedLastPart}`)
        const textSpanCloseRegex = new RegExp(`${escapedFirstPart}${spanCloseRegex.source}${escapedLastPart}`)

        const matchedOpeningSpan = textSpanOpenRegex.exec(selectedParagraphHtml)
        const matchedClosingSpan = textSpanCloseRegex.exec(selectedParagraphHtml)



        if (matchedOpeningSpan || matchedClosingSpan) {

            const extendedHighlighting = matchedOpeningSpan
                ? extendHighlightStart({ matchedOpeningSpan, selectedParagraphHtml, spanOpenRegex, spanOpenTag })
                : extendHighlightEnd({ matchedClosingSpan, selectedParagraphHtml, spanOpenTag, spanOpenRegex })

            if (!extendedHighlighting || extendedHighlighting.match(emptySpanRegex)) return

            bothTags = false
            return extendedHighlighting
        }


    }

    if (bothTags) {
        const paragraphNoHighlight = removeHighlight({ paragraphContainer, fromHighlight: true, highlightedContent, setPosition, setHighlightedContent })
        if (!paragraphNoHighlight) return

        const newHighlighting = highlightPlainText({ fullPlainTxt, spanOpenTag, htmlContent: paragraphNoHighlight })

        return newHighlighting
    }



}