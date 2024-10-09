import { StartEndProps } from "../types"

//ERROR AL MARCAR PEQUEÑAS PALABRAS (09/10/2024)
export function extendStartEnd({plainText,range,spanCloseTag,spanOpenTag,userSeleccion}: StartEndProps){
    
    if (!range?.startOffset) return

    const plainTextFirstPart = plainText?.slice(0, range?.startOffset)                
    
    const plainTextLastPart = plainText?.slice(range.startOffset + userSeleccion.length)

    const newHighlight = plainTextFirstPart+spanOpenTag+userSeleccion+spanCloseTag+plainTextLastPart

    const noHighlight = plainTextFirstPart+userSeleccion+plainTextLastPart



    // If they are not the same, it means that the first full highlighted text is not being included in the user seleccion
    if (noHighlight !== plainText) {
        console.log("exepcion");
        

        const rCmnAncestor = range?.commonAncestorContainer as HTMLElement

        const firstSpanTxt = rCmnAncestor.firstElementChild?.textContent
        if (!firstSpanTxt) return


        const firstPart = plainText.slice(0, range.startOffset + (firstSpanTxt.length) + (rCmnAncestor.firstChild?.textContent?.length))

        const lastPart = plainText.slice(firstPart.length + userSeleccion.length)
        console.log(lastPart)
             

        return firstPart+spanOpenTag+userSeleccion+spanCloseTag+lastPart
    
    }


    return newHighlight
}