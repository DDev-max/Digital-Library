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


    function highlightColor(e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {


        const eTarget = e.target as HTMLElement
        // const spanOpen = /<span class="contextMenu_color--\w+">/g
        // const spanClose = /<\/span>/g
        const dblSpaceDot = /\. {2}/g
        const wSelect = window.getSelection()
        const range = wSelect?.getRangeAt(0)
        const userSeleccion =  wSelect?.toString()
        
        const paragraphIdx = range?.startContainer.parentElement?.getAttribute('data-index')
        

        //Double space is added after dot for some reason
        const selectedParagraph = highlightedContent[Number(paragraphIdx)].replace(dblSpaceDot, ". ")

        //Encontrar cuantas frases/palabras repetidas hay en el parrafo de la seleccion

        if (!userSeleccion) return


        //Buscar cual palabra repetida en especifico fue la seleccionada

        const selectionRanges = `${range?.startOffset},${range?.endOffset}`
        const noHTML = range?.startContainer.textContent

        
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


        // Encontrar el indice de una frase / palabra repetida en especifico
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


        /*
            Quiero encontrar el indice de una cadena de texto dentro de un parrafo, el cual incluye la cadena de texto, pero dentro de ella puede incluir una palabra en particular.


            Quiero buscar el indice de la cadena de texto "hola, que tal" dentro de un parrafo,  el cual contiene a la cadena de texto pero puede que tenga la la frase "soy Juan" dentro de ella en cualquier posicion, por ejemplo "hola, soy Juan que tal" o "hola, que tal soy Juan" o cualquier otra variacion posible. Como puedo realizar eso en JavaScript?


            Regex en javascript para buscar una cadena de texto que puede contener una palabra en especifico en cualquier posicion de la cadena de texto
        */
        if (innerHTMLStartIdx == -1) {
            console.log(innerHTMLStartIdx)
            console.log(userSeleccion)
            console.log(selectedParagraph);
            
            
            return
        }
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