import { spanCloseTag } from "../../data/consts"
import { removeHighlightProps } from "../../data/types"
import { getPreviousContent } from "../../Utils/getPreviousContent"
import { changeContent } from "./changeContent"


export function removeHighlight({fromHighlight, data,queryClient, setPosition}:removeHighlightProps) {     
        
    const range = window.getSelection()?.getRangeAt(0)

    const toRemoveTxt = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
    
    if (!toRemoveTxt) return

    
    const classToSearch =range?.startContainer.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement).className ||  undefined     
    
    
    const spanOpenToSearch = `<span class="${classToSearch}">`

    const toSearch = spanOpenToSearch+toRemoveTxt+spanCloseTag
    
    const paragraph= range?.startContainer.parentElement?.closest("p")

    const paragraphIdx = Number(paragraph?.getAttribute('data-index'))

    const firstIdx = data[paragraphIdx].indexOf(toSearch)
    const lastIdx =  data[paragraphIdx].lastIndexOf(toSearch)


    if (firstIdx === -1) return

    if (firstIdx !== lastIdx){
        const fullPreviousContent = getPreviousContent(range?.startContainer.previousSibling)
        
        let nOcurrences = 1
        let fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt) // searches the index within the plain text

        

        while (fullPreviousIdx !== -1) {
            fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt, fullPreviousIdx + 1)
            nOcurrences++
        }
        

        let currentWord= 1
        let realIdx= data[paragraphIdx].indexOf(toRemoveTxt)

        while (currentWord !== nOcurrences) {
            realIdx= data[paragraphIdx].indexOf(toRemoveTxt, realIdx + 1)

            currentWord++
        }
                

        const firsPart = data[paragraphIdx].slice(0, realIdx - spanOpenToSearch.length)

        const lastPart = data[paragraphIdx].slice(realIdx + toRemoveTxt.length + spanCloseTag.length)

        if (fromHighlight) {
            return firsPart+toRemoveTxt+lastPart
        }

        const copy = [...data]
        copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart

        changeContent({newData:copy, queryClient})   
        return  
        
    }
    
    const firsPart = data[paragraphIdx].slice(0, firstIdx)
    const lastPart = data[paragraphIdx].slice(firstIdx+ spanOpenToSearch.length + toRemoveTxt?.length + spanCloseTag.length)
    
    const copy = [...data]
    copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart
    

    if (fromHighlight) {
        return firsPart+toRemoveTxt+lastPart
    }

    changeContent({newData:copy, queryClient})   
    setPosition({display: "none"})
}