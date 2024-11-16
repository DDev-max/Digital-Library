import { NewAlertProps } from "../data/types"

export function newAlert({setAlert,string}: NewAlertProps){

    setAlert(string)
        
    setTimeout(() => {
        setAlert("")
    }, 2000)

    
    return
}