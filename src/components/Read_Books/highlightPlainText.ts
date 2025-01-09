import { spanCloseTag } from "data/consts"
import { getPreviousPlainText } from "../../Utils/getPreviousContent"


interface highlightPlainTextProps{
    range: Range | undefined,
    htmlContent: string ,
    userSeleccion: string,
    spanOpenTag: string,
    fullPlainTxt: string | null
}

export function highlightPlainText({range, htmlContent, userSeleccion,spanOpenTag, fullPlainTxt}:highlightPlainTextProps) {
    
    if (!fullPlainTxt || !range ) return

    let rangeStart =  range.startOffset

    //ver si se puede cambiar esta basura (.previousSibling)
    const fullPreviousContent = getPreviousPlainText(range.startContainer.previousSibling)

    if (fullPreviousContent) rangeStart += fullPreviousContent.length
    
    let currentIdxPlainTxt = fullPlainTxt.indexOf(userSeleccion)
    let nMatchPlainTxt = 1 
    
    if (currentIdxPlainTxt === -1) return
    
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
    const spanHighlight = spanOpenTag + userSeleccion + spanCloseTag
    const lastPart= htmlContent.slice(currentIdxHtml + userSeleccion.length)
    
    const newHighlight = firstPart + spanHighlight + lastPart

    return newHighlight

}