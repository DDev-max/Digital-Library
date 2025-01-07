import { emptySpanRegex, spanCloseRegex, spanOpenRegex } from "../../data/consts"
import { highlightColorProps } from "../../data/types"
import { extendHighlightEnd } from "./extendHighlightEnd"
import { extendHighlightStart } from "./extendHighlightStart"
import { highlightPlainText } from "./highlightPlainText"
import { newAlert } from "../../Utils/newAlert"
import { removeHighlight } from "./removeHighlight"


export function highlightColor({ e, highlightedContent, setAlert, setHighlightedContent, setPosition, paragraphContainer }: highlightColorProps) {

    const eTarget = e.target as HTMLElement
    const wSelect = window.getSelection()
    const range = wSelect?.getRangeAt(0)
    const userSeleccion = wSelect?.toString()
    const comnAncestor = range?.commonAncestorContainer
    if (!userSeleccion) return


    const spanOpenTag = `<span class="${eTarget.classList[1]}">`

    const paragraphIdx = Number(comnAncestor?.parentElement?.nodeName === "P" ? 
        comnAncestor.parentElement.getAttribute('data-index') : 
        (comnAncestor as HTMLElement).getAttribute('data-index'))

    if(isNaN(paragraphIdx)) return

    //if more than one paragraph is selected at the same time
    if (comnAncestor == paragraphContainer.current) {
        newAlert({ setAlert, string: "Please select one paragraph at a time" })
        wSelect?.removeAllRanges()
        return
    }



    const selectedParagraph = highlightedContent[paragraphIdx]

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = selectedParagraph

    const fullPlainTxt = tempDiv.textContent

    let newHtml = highlightPlainText({ userSeleccion, range, spanOpenTag, htmlContent: selectedParagraph, fullPlainTxt })


    // if there is no 'newHtml' it means that there is already highlighted text in the paragraph
    if (!newHtml) {

        const regexSpecialCharacters = /[.*+?^${}()|[\]\\]/g

        let bothTags = true
        for (let i = 0; i <= userSeleccion.length; i++) {
            const selectionFirstPart = userSeleccion.slice(0, i);
            const selectionLastPart = userSeleccion.slice(i);

            const escapedFirstPart = selectionFirstPart.replace(regexSpecialCharacters, '\\$&')
            const escapedLastPart = selectionLastPart.replace(regexSpecialCharacters, '\\$&')

            const textSpanOpenRegex = new RegExp(`${escapedFirstPart}${spanOpenRegex.source}${escapedLastPart}`)
            const textSpanCloseRegex = new RegExp(`${escapedFirstPart}${spanCloseRegex.source}${escapedLastPart}`)

            const hasSpanOpen = textSpanOpenRegex.exec(selectedParagraph)
            const hasSpanClose = textSpanCloseRegex.exec(selectedParagraph)



            if (hasSpanOpen || hasSpanClose) {

                newHtml = hasSpanOpen
                    ? extendHighlightStart({ hasSpanOpen, selectedParagraph, spanOpenRegex, spanOpenTag })
                    : extendHighlightEnd({ hasSpanClose, selectedParagraph, spanOpenTag, spanOpenRegex })

                if (!newHtml || newHtml.match(emptySpanRegex)) return

                bothTags = false
                break
            }


        }

        if (bothTags) {
            const paragraphNoHighlight = removeHighlight({ fromHighlight: true, highlightedContent, setPosition, setHighlightedContent })
            if (!paragraphNoHighlight) return

            newHtml = highlightPlainText({ fullPlainTxt, range, spanOpenTag, userSeleccion, htmlContent: paragraphNoHighlight })
        }

    }


    const copy = [...highlightedContent]

    tempDiv.innerHTML = newHtml ?? ""

    //if the user attempts to nest the highlighting
    if (tempDiv.textContent != fullPlainTxt || !newHtml) {
        newAlert({ setAlert, string: "First try removing some highlighting from the selection." })
        return
    }

    copy[paragraphIdx] = newHtml
    setHighlightedContent(copy)
    setPosition({ display: "none" })

    return

}