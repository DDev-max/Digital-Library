import { useHighlightCntxt } from "../Context/useHighlightContxt"

export function Alert() {
    
    const {alert} = useHighlightCntxt()

    return(
        alert && 
        <div className="alert">
            <p> {alert} </p>
        </div>
    )
}