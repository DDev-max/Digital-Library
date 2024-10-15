import { spanCloseTag } from "../../consts"
import { highlightColorProps } from "../../types"
import { extendHighlightEnd } from "./extendHighlightEnd"
import { extendHighlightStart } from "./extendHighlightStart"
import { highlightPlainText } from "./highlightPlainText"
import { removeHighlight } from "./removeHighlight"


export function highlightColor({e,highlightedContent,setHighlightedContent, setAlert}: highlightColorProps) {

    const eTarget = e.target as HTMLElement
    const wSelect = window.getSelection()
    const range = wSelect?.getRangeAt(0)
    const userSeleccion =  wSelect?.toString()
    if (!userSeleccion) return

    const spanOpenTag = `<span class="${eTarget.classList[1]}">`
    const spanOpenRegex = /<span class="contextMenu_color--(first|second|third|fourth)">/g
    const spanCloseRegex = /<\/span>/g

    const emptySpanRegex = /<span class="contextMenu_color--(first|second|third|fourth)"><\/span>/g


    const paragraphIdx = range?.commonAncestorContainer.nodeName === "#text"
    ? Number(range.commonAncestorContainer.parentElement?.closest('p')?.getAttribute('data-index'))
    : Number((range?.commonAncestorContainer as HTMLElement).getAttribute('data-index'))
    

    //Si se seleccionan dos parrafos a la vez
    if ((range?.commonAncestorContainer as HTMLElement).className == "paragraphsContainer" ){                            
        setAlert("Please select one paragraph at a time")
        
        setTimeout(() => {
            setAlert("")
        }, 2000);
        return        
    }

    const selectedParagraph = highlightedContent[paragraphIdx]

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = selectedParagraph

    const fullPlainTxt = tempDiv.textContent

    let newHtml = highlightPlainText({userSeleccion ,range, spanOpenTag, spanCloseTag,  htmlContent: selectedParagraph, fullPlainTxt})

    
    //SI NO DEVUELVE NUEVO HTML, ES POR QUE SE SELECCIONO TEXTO QUE YA ESTA SUBRAYADO CON TEXTO PLANO
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
            const paragraphNoHighlight = removeHighlight({highlightedContent, setHighlightedContent,fromHighlight: true})
            if (!paragraphNoHighlight) return
            
            newHtml = highlightPlainText({fullPlainTxt,range,spanCloseTag,spanOpenTag,userSeleccion, htmlContent: paragraphNoHighlight})
        }

    }

    
    const copy = [...highlightedContent]

    tempDiv.innerHTML = newHtml ?? ""

    if (tempDiv.textContent != fullPlainTxt || !newHtml) {
        // Ocurre cuando se quiere extender el subrayado de etiquetas de diferentes colores
        setAlert("First try removing the highlighting from the selection.")

        setTimeout(() => {
            setAlert("")
        }, 2000);
        return
        
    }

    copy[paragraphIdx] = newHtml
    setHighlightedContent(copy)
    return


}