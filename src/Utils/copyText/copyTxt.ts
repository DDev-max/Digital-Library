import type { AlertState } from "../../data/types";
import { newAlert } from "../newAlert";

export function copyTxt({ setAlert }: Pick<AlertState, "setAlert">) {

    const selection = window.getSelection()?.toString()
    
    if (!selection) return

    

    navigator.clipboard.writeText(selection)
        .then(() => {
            
            newAlert({ setAlert, string: "Text Copied" })
        })

}