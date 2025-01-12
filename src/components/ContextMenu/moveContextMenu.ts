import { menuSize } from "data/consts"
import type { CSSProperties, Dispatch, RefObject, SetStateAction } from "react"

interface MoveContextMenuProps{
    e: MouseEvent
    paragraphContainer:  RefObject<HTMLDivElement>
    setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>
}

export function moveContextMenu({e, paragraphContainer,setPosition}:MoveContextMenuProps) {
    const targetIsNode = e.target instanceof Node

    const userSelection = window.getSelection()?.toString()

    if ((targetIsNode && !paragraphContainer.current?.contains(e.target)) || !userSelection) return


    e.preventDefault()


    const menuPosition: CSSProperties = {
        right: e.pageX + menuSize > window.innerWidth ? 0 : "auto",
        left: e.pageX + menuSize > window.innerWidth ? "auto" : e.pageX,

        top: e.clientY + menuSize > window.innerHeight ? "auto" : e.clientY,
        bottom: e.clientY + menuSize > window.innerHeight ? 0 : "auto",

        display: "block"

    }

    setPosition(menuPosition)
}
