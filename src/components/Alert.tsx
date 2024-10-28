import { useHighlightCntxt } from "../Context/useHighlightContxt"

export function Alert() {
    
    const {alert} = useHighlightCntxt()

    return(
        alert && 
        <dialog open className="alert">
            <p> {alert} </p>
        </dialog>
    )
}