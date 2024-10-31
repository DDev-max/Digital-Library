import { FormSubmitProps } from "../data/types"
import { newAlert } from "./newAlert"

export function formSubmit({e,markerPosition,setAlert}:FormSubmitProps) {
    e.preventDefault()

    const userInfo = Object.fromEntries(new window.FormData(e.target as HTMLFormElement))

    if (markerPosition) {
        userInfo.coordinates = markerPosition.toString()
    }

    newAlert({setAlert, string: "Form submitted!"})

    console.log(userInfo)
    
}
