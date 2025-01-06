import { emptySpanRegex, spanCloseRegex, spanCloseTag, spanOpenRegex } from "../../data/consts"
import { highlightColorProps } from "../../data/types"
import { extendHighlightEnd } from "./extendHighlightEnd"
import { extendHighlightStart } from "./extendHighlightStart"
import { highlightPlainText } from "./highlightPlainText"
import { newAlert } from "../../Utils/newAlert"
import { removeHighlight } from "./removeHighlight"


export function highlightColor({e,highlightedContent,setAlert,setHighlightedContent,setPosition}: highlightColorProps) {

    const eTarget = e.target as HTMLElement
    const wSelect = window.getSelection()
    const range = wSelect?.getRangeAt(0)
    const userSeleccion =  wSelect?.toString()
    if (!userSeleccion) return

    const spanOpenTag = `<span class="${eTarget.classList[1]}">`

    const paragraphIdx = range?.commonAncestorContainer.nodeName === "#text"
    ? Number(range.commonAncestorContainer.parentElement?.closest('p')?.getAttribute('data-index'))
    : Number((range?.commonAncestorContainer as HTMLElement).getAttribute('data-index'))
    

    //if more than one paragraph is selected at the same time
    if ((range?.commonAncestorContainer as HTMLElement).className == "readBook_paragraphsContainer" ){                            
        newAlert({setAlert,string: "Please select one paragraph at a time"})
        return        
    }

    const selectedParagraph = highlightedContent[paragraphIdx]

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = selectedParagraph

    const fullPlainTxt = tempDiv.textContent

    let newHtml = highlightPlainText({userSeleccion ,range, spanOpenTag, spanCloseTag,  htmlContent: selectedParagraph, fullPlainTxt})

    
    //if there is no 'newHtml' it means that there is already highlighted text in the paragraph
    if (!newHtml && !isNaN(paragraphIdx)) {

        let bothTags = true
        for (let i = 0; i <= userSeleccion.length; i++) {
            const selectionFirstPart = userSeleccion.slice(0, i);
            const selectionLastPart = userSeleccion.slice(i);
        
            const textSpanOpenRegex = new RegExp(`${selectionFirstPart}${spanOpenRegex.source}${selectionLastPart}`)
            const textSpanCloseRegex = new RegExp(`${selectionFirstPart}${spanCloseRegex.source}${selectionLastPart}`)
        
            const hasSpanOpen = textSpanOpenRegex.exec(selectedParagraph)
            const hasSpanClose = textSpanCloseRegex.exec(selectedParagraph)                

            if (hasSpanOpen || hasSpanClose) {  
                

                newHtml = hasSpanOpen
                ? extendHighlightStart({hasSpanOpen, selectedParagraph,spanCloseTag,spanOpenRegex,spanOpenTag})
                : extendHighlightEnd({hasSpanClose,selectedParagraph,spanCloseTag,spanOpenTag, spanOpenRegex})

                if (!newHtml || newHtml.match(emptySpanRegex)) return
                
                bothTags = false
                break
            }


        }

        if (bothTags) {
            const paragraphNoHighlight = removeHighlight({fromHighlight: true, highlightedContent,setPosition,setHighlightedContent})
            if (!paragraphNoHighlight) return
            
            newHtml = highlightPlainText({fullPlainTxt,range,spanCloseTag,spanOpenTag,userSeleccion, htmlContent: paragraphNoHighlight})
        }

    }

    
    const copy = [...highlightedContent]

    tempDiv.innerHTML = newHtml ?? ""

    //if the user attempts to nest the highlighting
    if (tempDiv.textContent != fullPlainTxt || !newHtml) {
        newAlert({setAlert,string: "First try removing some highlighting from the selection."})
        return
        
    }

    copy[paragraphIdx] = newHtml
    // changeContent({queryClient,newData:copy})
    setHighlightedContent(copy)
    setPosition({display: "none"})

    return

}