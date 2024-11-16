import { CopyTxProps } from "../data/types";
import { newAlert } from "./newAlert";

export function copyTxt({setAlert}:CopyTxProps){

    const seleccion = window.getSelection()?.toString()
    if (!seleccion) return

    navigator.clipboard.writeText(seleccion)
        .then(()=> {
            newAlert({setAlert,string: "Text Copied"})
        })

}