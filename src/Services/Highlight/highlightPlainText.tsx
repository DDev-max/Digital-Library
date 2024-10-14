import { getPreviousContent } from "../getPreviousContent"

export interface Pinga{
    range: Range | undefined,
    htmlContent: string ,
    userSeleccion: string,
    spanOpenTag: string,
    spanCloseTag: string,
    fullPlainTxt: string | null

}

export function highlightPlainText({range, htmlContent, userSeleccion, spanCloseTag,spanOpenTag, fullPlainTxt}:Pinga) {
    
    if (!fullPlainTxt || !range ) return
    

    let rangeStart =  range.startOffset
    const fullPreviousContent = getPreviousContent(range.startContainer.previousSibling)

    if (fullPreviousContent){
        rangeStart += fullPreviousContent.length
    }
    

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


    
    if (currentIdxHtml === -1) {

        return
        
    }
    

    

    while (nMatchHtml !== nMatchPlainTxt) {
        nMatchHtml++
        
        currentIdxHtml =  htmlContent.indexOf(userSeleccion, currentIdxHtml + 1)
        if (currentIdxHtml === -1) return
        
    }
    

    const firstPart = htmlContent.slice(0, currentIdxHtml)
    const spanHighlight = spanOpenTag + userSeleccion + spanCloseTag
    const lastPart= htmlContent.slice(currentIdxHtml + userSeleccion.length)
    
    
    const newHighlight = firstPart + spanHighlight + lastPart
    
    // console.log(firstPart);
    // console.log(spanHighlight);
    // console.log(lastPart);
    
    
    
    

    return newHighlight

}