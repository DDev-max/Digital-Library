import { spanCloseTag } from "data/consts"
import { getPreviousContent } from "Utils/getPreviousContent/getPreviousContent"


interface highlightPlainTextProps{
    htmlContent: string ,
    spanOpenTag: string,
    fullPlainTxt: string | null
}

export function highlightPlainText({htmlContent,spanOpenTag, fullPlainTxt}:highlightPlainTextProps) {
    
    const originalSelection = window.getSelection()?.toString()
    const range = window.getSelection()?.getRangeAt(0)
    
    if(!originalSelection) return
    
    //when the whole paragraph is selected by triple-clicking on it, some additional spaces are added in the selection
    const userSeleccion = originalSelection.slice(0, -2) === fullPlainTxt 
                        ? originalSelection.slice(0, -2)
                        : originalSelection
    

    if (!fullPlainTxt || !range ) return

    let rangeStart =  range.startOffset

    const {fullPreviousPlainText} = getPreviousContent(range.startContainer.previousSibling)

    if (fullPreviousPlainText) rangeStart += fullPreviousPlainText.length
        

    let currentIdxPlainTxt =  fullPlainTxt.indexOf(userSeleccion)


    let nMatchPlainTxt = 1 
    
    
    while (currentIdxPlainTxt !== rangeStart) {
        nMatchPlainTxt++

        currentIdxPlainTxt = fullPlainTxt?.indexOf(userSeleccion, currentIdxPlainTxt + 1)
        if (currentIdxPlainTxt === -1) return

    }
    

    let currentIdxHtml = htmlContent.indexOf(userSeleccion)
    
    
    let nMatchHtml = 1

    
    if (currentIdxHtml === -1) return
    

    while (nMatchHtml !== nMatchPlainTxt) {
        nMatchHtml++
        
        currentIdxHtml =  htmlContent.indexOf(userSeleccion, currentIdxHtml + 1)
        if (currentIdxHtml === -1) return
        
    }
    
    const firstPart = htmlContent.slice(0, currentIdxHtml)
    const highLightedSelection = spanOpenTag + userSeleccion + spanCloseTag
    const lastPart= htmlContent.slice(currentIdxHtml + userSeleccion.length)
    
    const newHighlight = firstPart + highLightedSelection + lastPart

    
    
    return newHighlight

}