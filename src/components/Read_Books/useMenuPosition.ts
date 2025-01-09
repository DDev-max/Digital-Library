import {useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { menuSize } from "../../data/consts"



export function useMenuPosition(menuRef: React.MutableRefObject<HTMLElement | null>){

    const [position, setPosition] =  useState<CSSProperties>() 
    const optnIdx = useRef(-1)



    useEffect(()=>{
        const hideContextMenu = (e: Event)=>{
            const eTarget = e.target as HTMLElement
                        

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

        const focusElmnt= (e: KeyboardEvent)=>{
            
            if (!menuRef.current) return

            //CAMBIAR
            const allOptns = menuRef.current.querySelectorAll(".contextMenu button")
            const nResults = allOptns.length

            
            if (e.key === "ArrowRight" || e.key==="Tab") {
                    optnIdx.current = (optnIdx.current + 1) % nResults;
                    (allOptns[optnIdx.current] as HTMLElement).focus()

            }
      
            if (e.key === "ArrowLeft") {

                optnIdx.current = optnIdx.current === -1 
                ? nResults - 1 
                : (optnIdx.current - 1 + nResults) % nResults;
      
                (allOptns[optnIdx.current] as HTMLElement).focus()
        
            }


            if (e.key ==="Escape") {
                setPosition({display: "none"})
            }


        }



        document.addEventListener("click", hideContextMenu)
        document.addEventListener("scroll", hideContextMenu)
        document.addEventListener("contextmenu", moveContextMenu)
        document.addEventListener("keydown", focusElmnt)

        return ()=> {
            document.removeEventListener("click", hideContextMenu)
            document.removeEventListener("scroll", hideContextMenu)
            document.removeEventListener("contextmenu", moveContextMenu)
            document.removeEventListener("keydown", focusElmnt)

        }


    
    }, [])


    return {position, setPosition}
}

