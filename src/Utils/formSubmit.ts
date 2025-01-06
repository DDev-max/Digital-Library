import { FormSubmitProps } from "../data/types"
import { newAlert } from "./newAlert"

//cambiar setAlert a setFormAlert
export function formSubmit({e,setAlert}:FormSubmitProps) {
    e.preventDefault()

    const userInfo = Object.fromEntries(new window.FormData(e.target as HTMLFormElement))
    console.log(userInfo);
    

    newAlert({setAlert, string: "Form submitted!"})
    
}
