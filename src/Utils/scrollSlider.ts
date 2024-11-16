import { ScrollSliderProps } from "../data/types";

export function scrollSlider({elmntRef, toRight= false}:ScrollSliderProps) {

    elmntRef.current?.scrollBy({behavior: "smooth", left: toRight ? -500 : 500})
}
