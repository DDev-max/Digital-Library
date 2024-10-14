export function getPreviousContent(from: Node | null | undefined){
    let  fullPreviousContent = ""

    let previousElmnt = from

    while (previousElmnt) {
        fullPreviousContent = previousElmnt.textContent + fullPreviousContent

        previousElmnt = previousElmnt.previousSibling        
    }
    
    return fullPreviousContent
}