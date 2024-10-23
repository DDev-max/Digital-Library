import { CopyTxProps } from "../data/types";

export function copyTxt({setAlert}:CopyTxProps){

    const seleccion = window.getSelection()?.toString()
    if (!seleccion) return

    navigator.clipboard.writeText(seleccion)
        .then(()=> {
            setAlert("Text Copied")
            setTimeout(() => {
                setAlert("")
            }, 2000);
        })

}