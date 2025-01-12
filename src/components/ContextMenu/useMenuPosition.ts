import {useEffect, useState } from "react"
import type { CSSProperties, MutableRefObject, RefObject } from "react"
import { hideContextMenu } from "./hideContextMenu"
import { moveContextMenu } from "./moveContextMenu"

interface UseMenuPositionProps{
    menuRef: MutableRefObject<HTMLDivElement | null>
    paragraphContainer:  RefObject<HTMLDivElement>
}

export function useMenuPosition({menuRef, paragraphContainer}: UseMenuPositionProps){

    const [position, setPosition] =  useState<CSSProperties>() 


    useEffect(()=>{
        const container = paragraphContainer.current

        const handleHideMenu = (e: MouseEvent) => hideContextMenu({e,menuRef,setPosition})
    
        const handleMoveMenu = (e:MouseEvent) => moveContextMenu({e,paragraphContainer,setPosition})



        document.addEventListener("click", handleHideMenu)
        document.addEventListener("scroll", handleHideMenu)
        //👇 if added directly in 'paragraphContainer', the component will be rendered again and the user's selection will be lost.
        container?.addEventListener("contextmenu", handleMoveMenu)

        return ()=> {
            document.removeEventListener("click", handleHideMenu)
            document.removeEventListener("scroll", handleHideMenu)
            container?.removeEventListener("contextmenu", handleMoveMenu)
        }


    
    }, [menuRef, paragraphContainer])


    return {position, setPosition}
}

