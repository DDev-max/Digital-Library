import { spanCloseTag } from "../../data/consts"
import { removeHighlightProps } from "../../data/types"
import { getPreviousContent } from "../../Utils/getPreviousContent"


export function removeHighlight({fromHighlight,highlightedContent,setHighlightedContent, setPosition}:removeHighlightProps) {     
        
    const range = window.getSelection()?.getRangeAt(0)

    const toRemoveTxt = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
    
    if (!toRemoveTxt) return

    
    const classToSearch =range?.startContainer.parentElement?.className ||(range?.startContainer?.nextSibling as HTMLElement).className        
    
    const spanOpenToSearch = `<span class="${classToSearch}">`

    const toSearch = spanOpenToSearch+toRemoveTxt+spanCloseTag
    
    const paragraph= range?.startContainer.parentElement?.closest("p")

    const paragraphIdx = Number(paragraph?.getAttribute('data-index'))

    const firstIdx = highlightedContent[paragraphIdx].indexOf(toSearch)
    const lastIdx =  highlightedContent[paragraphIdx].lastIndexOf(toSearch)


    if (firstIdx === -1) return

    //Si la palabra esta repetida
    if (firstIdx !== lastIdx){
        const fullPreviousContent = getPreviousContent(range?.startContainer.previousSibling)
        
        let nOcurrences = 1
        let fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt) // Se busca el indice DENTRO DEL TEXTO PLANO

        console.log(fullPreviousContent);
        

        while (fullPreviousIdx !== -1) {
            fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt, fullPreviousIdx + 1)
            nOcurrences++
        }
        

        let currentWord= 1
        let realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt)

        while (currentWord !== nOcurrences) {
            realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt, realIdx + 1)

            currentWord++
        }
                

        const firsPart = highlightedContent[paragraphIdx].slice(0, realIdx - spanOpenToSearch.length)

        const lastPart = highlightedContent[paragraphIdx].slice(realIdx + toRemoveTxt.length + spanCloseTag.length)

        if (fromHighlight) {
            return firsPart+toRemoveTxt+lastPart
        }

        const copy = [...highlightedContent]
        copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart

        setHighlightedContent(copy)   
        return  
        
    }
    
    const firsPart = highlightedContent[paragraphIdx].slice(0, firstIdx)
    const lastPart = highlightedContent[paragraphIdx].slice(firstIdx+ spanOpenToSearch.length + toRemoveTxt?.length + spanCloseTag.length)
    
    const copy = [...highlightedContent]
    copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart
    

    if (fromHighlight) {
        return firsPart+toRemoveTxt+lastPart
    }

    setHighlightedContent(copy)
    setPosition({display: "none"})
}