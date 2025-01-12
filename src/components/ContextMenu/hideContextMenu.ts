import type { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react"

interface HideContextMenuProps {
    e: MouseEvent
    menuRef: MutableRefObject<HTMLDivElement | null>
    setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>

}

export function hideContextMenu({ e, menuRef,setPosition }: HideContextMenuProps) {
    const targetIsNode = e.target instanceof Node

    if (e.type === "scroll") setPosition({ display: "none" })
    if (targetIsNode && !menuRef.current?.contains(e.target)) setPosition({ display: "none" })
}
