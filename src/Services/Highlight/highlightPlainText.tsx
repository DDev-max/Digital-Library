export interface Pinga{
    range: Range | undefined,
    htmlContent: string,
    userSeleccion: string,
    spanOpenTag: string,
    spanCloseTag: string

}

export function highlightPlainText({range, htmlContent, userSeleccion, spanCloseTag,spanOpenTag}:Pinga) {
    
    //ERROR: SELECCIONO ==> EXTIENDO AL FINAL ==> NESTING
    //HAY QUE HACER QUE EL EXTEND LO EXTIENDA Y NO AÑADA DOBLE

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlContent

    const fullPlainTxt = tempDiv.textContent
    
    if (!fullPlainTxt || !range ) return

    let rangeStart =  range.startOffset
    let previous = range.startContainer.previousSibling
    let fullPreviousContent = ""

    while (previous) {
        fullPreviousContent = previous.textContent + fullPreviousContent

        previous= previous.previousSibling
    }

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

    console.log(currentIdxHtml);
    console.log(htmlContent);
    
    if (currentIdxHtml === -1) {
        console.log("No encontrado");
        console.log(userSeleccion);
        console.log(htmlContent);
        
        

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