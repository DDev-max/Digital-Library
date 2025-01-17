import { highlightPlainText } from "./highlightPlainText"
import { newAlert } from "../../Utils/newAlert"
import type { AlertState, HighlightedContentState } from "data/types"
import { CSSProperties, RefObject } from "react"
import { getParagraphIdx } from "./getParagraphIdx"
import { highlightAgain } from "./highlightAgain"



//cambiar de userSeleccion ==> userSelection o a originalSelection mejor


interface HighlightParagraphProps extends HighlightedContentState, Pick<AlertState, "setAlert"> {
    e: React.MouseEvent<HTMLButtonElement>
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    paragraphContainer: RefObject<HTMLDivElement>
}


export function highlightParagraph({ e, highlightedContent, setAlert, setHighlightedContent, setPosition, paragraphContainer }: HighlightParagraphProps) {

    const eTarget = e.target as HTMLElement
    const wSelect = window.getSelection()
    const spanOpenTag = `<span class="${eTarget.classList[1]}">`
    const paragraphIdx = getParagraphIdx({  paragraphContainer })

    if (paragraphIdx < 0) {
        wSelect?.removeAllRanges()
        newAlert({ setAlert, string: "Please select one paragraph at a time" })
        return
    }


    const selectedParagraphHtml = highlightedContent[paragraphIdx]

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = selectedParagraphHtml

    const fullPlainTxt = tempDiv.textContent

    const newHtml = 
        highlightPlainText({ spanOpenTag, htmlContent: selectedParagraphHtml, fullPlainTxt })
        || 
        highlightAgain({fullPlainTxt, highlightedContent, paragraphContainer, selectedParagraphHtml, setHighlightedContent, setPosition, spanOpenTag })




    const copy = [...highlightedContent]

    tempDiv.innerHTML = newHtml ?? ""


    // when user tries to nest more than one highlighted text
    if (tempDiv.textContent != fullPlainTxt || !newHtml) {
        newAlert({ setAlert, string: "First try removing some highlighting from the selection." })
        return
    }

    copy[paragraphIdx] = newHtml
    setHighlightedContent(copy)
    setPosition({ display: "none" })
    wSelect?.removeAllRanges()

    return

}