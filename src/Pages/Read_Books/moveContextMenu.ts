import { CSSProperties } from "react"
import { menuSize } from "../../data/consts"

export const moveContextMenu = (e: MouseEvent)=>{
          
    const isSelected = window.getSelection()?.toString() != ""

    const commonAncestor = window.getSelection()?.getRangeAt(0).commonAncestorContainer as HTMLElement

    if (commonAncestor.id === "root" 
        || commonAncestor.nodeName === "MAIN" 
        || !isSelected ) {
        return
    }
    
    
    e.preventDefault()


    const menuPosition: CSSProperties = {
        right: e.pageX + menuSize > window.innerWidth? 0: "auto",
        left: e.pageX + menuSize > window.innerWidth? "auto": e.pageX,
        
        top: e.clientY + menuSize > window.innerHeight? "auto": e.clientY,
        bottom: e.clientY + menuSize > window.innerHeight? 0: "auto",

        display: "block"

    }

    return menuPosition
}