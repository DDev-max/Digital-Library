import { useHighlightCntxt } from "../Context/useHighlightContxt"
import { AlertProps } from "../data/types"

export function Alert({brdrColor}:AlertProps) {
    
    const context = useHighlightCntxt()
    if (!context) return

    const {alert} = context

    return(
        alert && 
        <dialog  role="alert" aria-live="assertive" open className={`alert${brdrColor ? "--green": ""}`}>
            <p> {alert} </p>
        </dialog>
    )
}


