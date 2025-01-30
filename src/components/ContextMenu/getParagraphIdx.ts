import type { RefObject } from "react";

interface GetParagraphIdxProps {
    paragraphContainer: RefObject<HTMLDivElement>
}

//HACER EN LINEA SI SOLO ES UNO

export function getParagraphIdx({ paragraphContainer }: GetParagraphIdxProps) {
    
    const range = window.getSelection()?.getRangeAt(0)
    const comnAncestor = range?.commonAncestorContainer
    const ancestorIsHtml = comnAncestor instanceof HTMLElement

    if (!paragraphContainer.current || !comnAncestor || !range) return -1


    let currentParagraph: Node | HTMLParagraphElement | undefined | null;



    if (comnAncestor === paragraphContainer.current) {
        
        //when the paragraph is selected by triple clicking on it👇
        if (range.startOffset === 0 && range.endOffset === 0) {            
            currentParagraph = range.startContainer.parentElement
        } else return -1
        
    } else if (comnAncestor.nodeType === Node.ELEMENT_NODE && ancestorIsHtml) {
        
        currentParagraph = comnAncestor.closest("p")
    } else {
        currentParagraph = comnAncestor.parentElement?.closest("p")
        
    }



    const index = Array.from(paragraphContainer.current.childNodes).findIndex((el) => el === currentParagraph)
    
    return index

}