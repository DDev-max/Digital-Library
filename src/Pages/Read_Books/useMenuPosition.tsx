import { CSSProperties, useEffect, useState } from "react"
import { menuSize } from "../../data/consts"

export function useMenuPosition(){
    const [position, setPosition] =  useState<CSSProperties>() 



    useEffect(()=>{
        const hideContextMenu = (e: Event)=>{
            const eTarget = e.target as HTMLElement
                        
            // para pasignarle la misma funcion a ambos eventos (ver los eventos añadidos)
            if (e.type === "scroll") setPosition({display: "none"})

            if (typeof eTarget.className === "string" && !eTarget.className.includes("contextMenu")) {
                setPosition({display: "none"})
            }
        }

        const moveContextMenu = (e: MouseEvent)=>{
          
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

            setPosition(menuPosition)
        }



        document.addEventListener("click", hideContextMenu)
        document.addEventListener("scroll", hideContextMenu)
        document.addEventListener("contextmenu", moveContextMenu)

        return ()=> {
            document.removeEventListener("click", hideContextMenu)
            document.removeEventListener("scroll", hideContextMenu)
            document.removeEventListener("contextmenu", moveContextMenu)
        }


    
    }, [])


    return {position, setPosition}
}

