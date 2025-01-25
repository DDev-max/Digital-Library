import { emptySpanRegex, regexSpecialCharacters, spanCloseRegex, spanOpenRegex } from "data/consts";
import { extendHighlightStart } from "./extendHighlightStart";
import { extendHighlightEnd } from "./extendHighlightEnd";
import { removeHighlight } from "./removeHighlight/removeHighlight";
import { highlightPlainText } from "./highlightPlainText";
import type { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import { BookContentState } from "data/types";
import { getParagraphIdx } from "./getParagraphIdx";

//sacar propr comunes

interface HighlightAgainProps extends BookContentState {
    selectedParagraphHtml: string
    spanOpenTag: string
    paragraphContainer: RefObject<HTMLDivElement>
    fullPlainTxt: string | null
    setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>
}

export function highlightAgain({ selectedParagraphHtml, spanOpenTag, bookContent, paragraphContainer, setBookContent, fullPlainTxt, setPosition }: HighlightAgainProps) {

    const userSeleccion =  window.getSelection()?.toString()
    if (!userSeleccion) return


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
        //SACAR O PASAR
        const range = window.getSelection()?.getRangeAt(0)
        const highlightToRemove =  range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
        if(!highlightToRemove) return

        // como que || undefined
        const classToSearch = range?.startContainer.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement).className ||  undefined     

        const spanOpenHighlight = `<span class="${classToSearch}">`

        const paragraphIdx = getParagraphIdx({paragraphContainer})
        
        const paragraphNoHighlight = removeHighlight({bookContent,highlightToRemove,spanOpenHighlight,paragraphIdx})
        setPosition({display: "none"})
        if (!paragraphNoHighlight) return

        const newHighlighting = highlightPlainText({ fullPlainTxt, spanOpenTag, htmlContent: paragraphNoHighlight })

        return newHighlighting
    }



}