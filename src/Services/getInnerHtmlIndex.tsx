import { HtmlFunctionProps } from "../types"

export function getInnerHtmlIndex({userSeleccion, range, plainText, selectedParagraph}: HtmlFunctionProps) {
    console.log("getting inner html");
    

    if (!userSeleccion) return
    //Encontrar cuantas frases/palabras repetidas hay en el parrafo de la seleccion
    //Buscar cual palabra repetida en especifico fue la seleccionada

    const selectionRanges = `${range?.startOffset},${range?.endOffset}`  //ejemplo: "0,12"

    
    /**
     Se busca la seleccion del usuario dentro del texto plano. Si se encuentra dicha seleccion dentro del parrafo (siempre) y no coincide con los indices seleccionados por el usuario, significa que la seleccion esta repetida dentro del parrafo, por lo tanto se le suma un numero mas a la variable de numero de coincidencias a buscar. Entonces en el texto con innerHTML se busca la coincidencia a partir de la cantidad de frases repetidas.
     */
    let nMatchToSearch = 1
    let textIdxStart = plainText?.indexOf(userSeleccion) || -1
    if (!textIdxStart) return
    
    while (textIdxStart !== -1) {
        const textIdxEnd  = textIdxStart + userSeleccion.length
        const textIdx = `${textIdxStart},${textIdxEnd}`

        if (selectionRanges == textIdx) break

        textIdxStart= plainText?.indexOf(userSeleccion, textIdxStart + 1) || -1

        nMatchToSearch++
    }


    // Encontrar el indice de una frase / palabra (repetida o no) en especifico
    let currentMacth = 0
    let innerHTMLStartIdx = 0

    while ((innerHTMLStartIdx =  selectedParagraph.indexOf(userSeleccion, innerHTMLStartIdx)) !== -1) {
        currentMacth++
        if (currentMacth === nMatchToSearch ) {
            break
        }

        innerHTMLStartIdx += userSeleccion.length
    }

    const innerHTMLEndIdx = innerHTMLStartIdx + userSeleccion.length

    return {innerHTMLStartIdx, innerHTMLEndIdx}
}