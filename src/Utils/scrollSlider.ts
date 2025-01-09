import type { RefObject } from "react"

interface ScrollSliderProps{
    elmntRef: RefObject<HTMLDivElement>
    toRight?: boolean
}

export function scrollSlider({elmntRef, toRight= false}:ScrollSliderProps) {

    elmntRef.current?.scrollBy({behavior: "smooth", left: toRight ? -500 : 500})
}
