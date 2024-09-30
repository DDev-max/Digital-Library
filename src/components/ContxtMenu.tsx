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

    const {highlightedContent, setHighlightedContent} = useContext(HighlightedCntxt)

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


    function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {


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

        if (innerHTMLStartIdx == -1) return
        const firstPart = selectedParagraph.slice(0, innerHTMLStartIdx)
        const lastPart  = selectedParagraph.slice(innerHTMLEndIdx)
        const stateCopy = [...highlightedContent]
        stateCopy[Number(paragraphIdx)] = `${firstPart}<span class="${eTarget.classList[1]}">${userSeleccion}</span>${lastPart}`

        setHighlightedContent(stateCopy)


        
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
            <CopySVG/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG/>
        </section>
    )
}
