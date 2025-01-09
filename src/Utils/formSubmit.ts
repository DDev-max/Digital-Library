import type { AlertState } from "data/types";
import { newAlert } from "./newAlert"

 interface FormSubmitProps extends Pick<AlertState, "setAlert">{
    e: React.FormEvent<HTMLFormElement>
}

export function formSubmit({e,setAlert}:FormSubmitProps) {
    e.preventDefault()

    const userInfo = Object.fromEntries(new window.FormData(e.target as HTMLFormElement))
    console.log(userInfo);
    

    newAlert({setAlert, string: "Form submitted!"})
    
}
