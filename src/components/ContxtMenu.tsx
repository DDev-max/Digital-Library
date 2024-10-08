import { useContext, useEffect, useState } from "react";
import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";
import { menuSize} from "../consts.ts"
import { UnselectSVG } from "../svg/UnselectSVG.tsx";
import { HighlightedCntxt } from "../contextAPI.tsx";


export function ContxtMenu() {
    const [position, setPosition] =  useState({}) 
    const [visibility, setVisibility] = useState(false)//QUITAR Y ENVEZ DE ESO RETORNAR DISPLAY NONE?
    
    const {highlightedContent, setHighlightedContent, setAlert} = useContext(HighlightedCntxt)

    //HACER QUE SE PUEDAN SUBRAYAR VARIOS PARRAFOS A LA VEZ


    //events handler:
    useEffect(()=>{
        const hideContextMenu = (e: Event)=>{
            const eTarget = e.target as HTMLElement
                        
            if (e.type === "scroll") setVisibility(false) 

            if (typeof eTarget.className === "string" && !eTarget.className.includes("contextMenu")) {
                setVisibility(false)
            }
        }

        const moveContextMenu = (e: MouseEvent)=>{
            const isSelected = window.getSelection()?.toString() != ""
            if (!isSelected) return

            e.preventDefault()


            const menuPosition = {
                right: e.pageX + menuSize > window.innerWidth? 0: "auto",
                left: e.pageX + menuSize > window.innerWidth? "auto": e.pageX,
                
                top: e.clientY + menuSize > window.innerHeight? "auto": e.clientY,
                bottom: e.clientY + menuSize > window.innerHeight? 0: "auto"

            }

            setPosition(menuPosition)
            setVisibility(true)  
        }




        document.addEventListener("click", hideContextMenu)
        document.addEventListener("contextmenu", moveContextMenu)
        document.addEventListener("scroll", hideContextMenu)

        return ()=> {
            document.removeEventListener("click", hideContextMenu)
            document.removeEventListener("contextmenu", moveContextMenu)
        }


    
    }, [])


    //CAMBIAR ESTO: 'Number(paragraphIndex)' por condicional


    //HAY ERROR CUANDO SE SELECCIONA FRAGMENTOS DE FRASES REPETIDAS 2-10-24
    function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {

        const eTarget = e.target as HTMLElement
        const wSelect = window.getSelection()
        const range = wSelect?.getRangeAt(0)
        const userSeleccion =  wSelect?.toString()

        const spanOpenTag = `<span class="${eTarget.classList[1]}">`
        const spanCloseTag = "</span>"
        const spanOpenRegex = /<span class="contextMenu_color--(first|second|third|fourth)">/
        const spanCloseRegex = /<\/span>/g //QUITAR LA "g" ?

        
        const dblSpaceDot = /\. {2}/g

        const paragraphIdx = range?.startContainer.parentElement?.getAttribute('data-index')

        //Double space is added after dot for some reason
        const selectedParagraph = highlightedContent[Number(paragraphIdx)].replace(dblSpaceDot, ". ")


        function getInnerHtmlIndex() {
            if (!userSeleccion) return
            //Encontrar cuantas frases/palabras repetidas hay en el parrafo de la seleccion

            //Buscar cual palabra repetida en especifico fue la seleccionada

            const selectionRanges = `${range?.startOffset},${range?.endOffset}`  //ejemplo: "0,12"
            const noHTML = range?.startContainer.textContent 

            
            /**
             Se busca la seleccion del usuario dentro del texto plano. Si se encuentra dicha seleccion dentro del parrafo y no coincide con los indices seleccionados por el usuario, significa que la seleccion esta repetida dentro del parrafo, por lo tanto se le suma un numero mas a la variable de numero de coincidencias a buscar. Entonces en el texto con innerHTML se busca la coincidencia a partir de la cantidad de frases repetidas.
             */
            let nMatchToSearch = 1
            let textIdxStart = noHTML?.indexOf(userSeleccion) || -1
            if (!textIdxStart) return
            
            while (textIdxStart !== -1) {
                const textIdxEnd  = textIdxStart + userSeleccion.length
                const textIdx = `${textIdxStart},${textIdxEnd}`

                if (selectionRanges == textIdx) break

                textIdxStart= noHTML?.indexOf(userSeleccion, textIdxStart + 1) || -1

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
      

        //CAMBIAR EL TS DE ESTA LINEA "getInnerHtmlIndex() ?? {}"
        const {innerHTMLStartIdx, innerHTMLEndIdx} = getInnerHtmlIndex() ?? {}


        //si no lo encuentra, es por que el texto seleccionado ya contiene texto subrayado
        if (innerHTMLStartIdx == -1) {
            console.log(userSeleccion)


            if (!userSeleccion) return
            for (let i = 0; i <= userSeleccion.length; i++) {
                const selectionFirstPart = userSeleccion.slice(0, i);
                const selectionLastPart = userSeleccion.slice(i);
            
                const textSpanOpenRegex = new RegExp(`${selectionFirstPart}${spanOpenRegex.source}${selectionLastPart}`)
                const textSpanCloseRegex = new RegExp(`${selectionFirstPart}${spanCloseRegex.source}${selectionLastPart}`)
            
                const hasSpanOpen = textSpanOpenRegex.exec(selectedParagraph)
                const hasSpanClose = textSpanCloseRegex.exec(selectedParagraph)
                



                if (hasSpanOpen) {
                    console.log("hay apertura");
                    
                    const htmlSelectionStart = hasSpanOpen.index
                    const htmlSelectionEnd = htmlSelectionStart + hasSpanOpen[0].length

                    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

                    const searchSpan = spanOpenRegex.exec(htmlSelection)
                    if (!searchSpan) return

                    const presentSpan = htmlSelection.slice(searchSpan?.index, searchSpan?.index + searchSpan?.[0].length)

                    

                    const noOpenTag = htmlSelection.replace(spanOpenRegex, "")

                    const newHighlight = `${spanOpenTag}${noOpenTag}${spanCloseTag}`

                    
                    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)
                    const lastPart= selectedParagraph.slice(htmlSelectionEnd)
                    
                    const newHtml = firstPart+newHighlight+presentSpan+lastPart

                    const stateCopy = [...highlightedContent]
                    stateCopy[Number(paragraphIdx)] = newHtml

                    setHighlightedContent(stateCopy)

                }

                if (hasSpanClose) {
                    console.log("hay cierre");

                    const htmlSelectionStart = hasSpanClose.index

                    const htmlSelectionEnd = htmlSelectionStart + hasSpanClose[0].length

                    const htmlSelection = selectedParagraph.slice(htmlSelectionStart, htmlSelectionEnd)

                    const noSpanClose = htmlSelection.replace(spanCloseTag, "")

                    const firstPart = selectedParagraph.slice(0, htmlSelectionStart)

                    const lastPart = selectedParagraph.slice(htmlSelectionEnd)

                    const newHMTL = firstPart+spanCloseTag+spanOpenTag+noSpanClose+spanCloseTag+lastPart

                    const stateCopy = [...highlightedContent]
                    stateCopy[Number(paragraphIdx)] = newHMTL
                    setHighlightedContent(stateCopy)
                    
                    
                }
                

                //  BUSCAR EL INDICE DEL PRIMER ELEMENTO SELECCIONADO DENTRO DEL TEXTO PLANO Y BUSCAR LA REPETICION(igual que la funcion "getInnerHtmlIndex") y a partir de ello buscoel ultimo elemento seleccionado. CON TODO ESO OBTENGO LA SELECCION DEL HTML

                //LUEGO ELIMINAR LAS SPAN DENTRO DE EL Y ENVOLVERLAS EN UNA SOLA


            }
            
            
            

            return
        }

        //finalmente se divide el texto
        const firstPart = selectedParagraph.slice(0, innerHTMLStartIdx)
        const lastPart  = selectedParagraph.slice(innerHTMLEndIdx)
        const stateCopy = [...highlightedContent]
        stateCopy[Number(paragraphIdx)] = `${firstPart}<span class="${eTarget.classList[1]}">${userSeleccion}</span>${lastPart}`

        setHighlightedContent(stateCopy)


    }
    

    function copyTxt() {
        const seleccion = window.getSelection()?.toString();
        if (!seleccion) return

        navigator.clipboard.writeText(seleccion)
            .then(()=> {
                setAlert("Text Copied")
                setTimeout(() => {
                    setAlert("")
                }, 2000);
            })
/*


Error aqui:
      navigator.clipboard.writeText(seleccion)
            .then(setAlert("Copied text"))

Argument of type 'void' is not assignable to parameter of type '((value: void) => void | PromiseLike<void>) | null | undefined'.ts(2345)

*/
            

    }

    function googleSearch() {
        const seleccion = window.getSelection()?.toString()
        
        const url = `https://www.google.com/search?q=${seleccion}`
        window.open(url)
        
    }


    function removeHighlight() {
        
    }

    return(
        
        visibility && 
        <section style={{...position}} className="contextMenu">
            <div className="contextMenu_ColorsCont">
                <button onClick={(e)=> highlightColor(e)} className="contextMenu_color contextMenu_color--first"></button>
                <button onClick={(e)=> highlightColor(e)} className="contextMenu_color contextMenu_color--second"></button>
                <button onClick={(e)=> highlightColor(e)} className="contextMenu_color contextMenu_color--third"></button>
                <button onClick={(e)=> highlightColor(e)} className="contextMenu_color contextMenu_color--fourth"></button>

                <button onClick={removeHighlight} className="contextMenu_unselectBtn">
                    <UnselectSVG className="contextMenu_unselectSVG"/>
                </button>
                
            </div>
            <CopySVG onMouseDown={copyTxt}/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG onMouseDown={googleSearch}/>
        </section>
    )
}


/**
 
const texto = "hola bonito mundo";
const regex = /(?:bonito\s+)?hola(?:\s+bonito)?(?:\s+mundo)?/i;

// Prueba
if (regex.test(texto)) {
    console.log("Coincide");
} else {
    console.log("No coincide");
}



 */




/*



const palabraOpcional = "bonito";

ESCAPADA: HACER QUE INTERPRETE TAL COMO ESTA Y NO LO INTERPRETE COMO REGEX
const palabraEscapada = palabraOpcional.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const regex = new RegExp(`(?:${palabraEscapada}\\s+)?hola(?:\\s+${palabraEscapada})?(?:\\s+mundo)?`, 'i');

const textos = [
    "hola mundo",
    "hola bonito mundo",
    "bonito hola mundo",
    "hola bonito bonito mundo",
    "hola",
    "mundo bonito hola"
];

textos.forEach(t => {
    console.log(`${t} => ${regex.test(t) ? "Coincide" : "No coincide"}`);
});



 */