import { useContext } from "react"
import { HighlightedCntxt } from "../contextAPI"

export function Alert() {
    
    const {alert} = useContext(HighlightedCntxt)

    return(
        alert && 
        <div className="alert">
            <p> {alert} </p>
        </div>
    )
}