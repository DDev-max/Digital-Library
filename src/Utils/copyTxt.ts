import type { AlertState } from "../data/types";
import { newAlert } from "./newAlert";

export function copyTxt({setAlert}: Pick<AlertState, "setAlert">){

    const seleccion = window.getSelection()?.toString()
    if (!seleccion) return

    navigator.clipboard.writeText(seleccion)
        .then(()=> {
            newAlert({setAlert,string: "Text Copied"})
        })

}