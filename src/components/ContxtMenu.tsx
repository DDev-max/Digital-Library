import { useContext, useEffect, useState } from "react";
import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";
import { menuSize} from "../consts.ts"
import { UnselectSVG } from "../svg/UnselectSVG.tsx";
import { HighlightedCntxt } from "../contextAPI.tsx";
import { highlightPlainText } from "../Services/Highlight/highlightPlainText.tsx";
import { extendHighlightStart } from "../Services/Highlight/extendHighlightStart.tsx";
import { extendHighlightEnd } from "../Services/Highlight/extendHighlightEnd.tsx";
// import { extendStartEnd } from "../Services/extendStartEnd.tsx";
import { copyTxt } from "../Services/copyTxt.tsx";
import { googleSearch } from "../Services/googleSearch.tsx";



const spanCloseTag = "</span>"

export function ContxtMenu() {
    const [position, setPosition] =  useState({}) 
    const [visibility, setVisibility] = useState(false)//QUITAR Y ENVEZ DE ESO RETORNAR DISPLAY NONE?
    
    const {highlightedContent, setHighlightedContent, setAlert} = useContext(HighlightedCntxt)

    //HACER QUE SE PUEDAN SUBRAYAR VARIOS PARRAFOS A LA VEZ

    //events handler:
    useEffect(()=>{
        const hideContextMenu = (e: Event)=>{
            const eTarget = e.target as HTMLElement
                        
            // para pasignarle la misma funcion a ambos eventos (ver los eventos añadidos)
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
        document.addEventListener("scroll", hideContextMenu)
        document.addEventListener("contextmenu", moveContextMenu)

        return ()=> {
            document.removeEventListener("click", hideContextMenu)
            document.removeEventListener("scroll", hideContextMenu)
            document.removeEventListener("contextmenu", moveContextMenu)
        }


    
    }, [])


    //CAMBIAR ESTO: 'Number(paragraphIndex)' por condicional


    //HAY ERROR CUANDO SE SELECCIONA FRAGMENTOS DE FRASES REPETIDAS 2-10-24
    function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {

        const eTarget = e.target as HTMLElement
        const wSelect = window.getSelection()
        const range = wSelect?.getRangeAt(0)
        const userSeleccion =  wSelect?.toString() || ""
        // const plainText = range?.commonAncestorContainer.textContent || ""     

        //USAR CLOSEST?
        const plainText = range?.commonAncestorContainer.parentElement?.textContent

        const spanOpenTag = `<span class="${eTarget.classList[1]}">`
        const spanOpenRegex = /<span class="contextMenu_color--(first|second|third|fourth)">/
        // const fullSpanRegex = /<span class="contextMenu_color--(first|second|third|fourth)">|<\/span>/g
        const spanCloseRegex = /<\/span>/g          //QUITAR LA "g" ?
        
        const paragraphIdx = range?.startContainer.parentElement?.getAttribute('data-index') || ""
        if (paragraphIdx === undefined || paragraphIdx === null || isNaN(Number(paragraphIdx))) return;

        const selectedParagraph = highlightedContent[Number(paragraphIdx)]
      

        const newHtml = highlightPlainText({userSeleccion ,range, spanOpenTag, spanCloseTag,  htmlContent: selectedParagraph})




        if (!newHtml) {
            console.log("Ya hay texto subrayado");
            

            if (!userSeleccion) return

            let bothTags = true

            for (let i = 0; i <= userSeleccion.length; i++) {
                const selectionFirstPart = userSeleccion.slice(0, i);
                const selectionLastPart = userSeleccion.slice(i);
            
                const textSpanOpenRegex = new RegExp(`${selectionFirstPart}${spanOpenRegex.source}${selectionLastPart}`)
                const textSpanCloseRegex = new RegExp(`${selectionFirstPart}${spanCloseRegex.source}${selectionLastPart}`)
            
                const hasSpanOpen = textSpanOpenRegex.exec(selectedParagraph)
                const hasSpanClose = textSpanCloseRegex.exec(selectedParagraph)                


                if (hasSpanOpen) {        
                    
                    const  newHtml = extendHighlightStart({hasSpanOpen, selectedParagraph,spanCloseTag,spanOpenRegex,spanOpenTag})
                    if (!newHtml) return


                    const stateCopy = [...highlightedContent]
                    stateCopy[Number(paragraphIdx)] = newHtml
                
                    setHighlightedContent(stateCopy)

                    bothTags = false


                    break

                }else if (hasSpanClose) {

                    const newHtml = extendHighlightEnd({hasSpanClose,selectedParagraph,spanCloseTag,spanOpenTag})
                    if (!newHtml) return

                    const stateCopy = [...highlightedContent]
                    stateCopy[Number(paragraphIdx)] = newHtml

                    setHighlightedContent(stateCopy)
                    bothTags = false

                    break
                    
                    
                } 


            }

            if (bothTags){                

                // MOSTRAR MENSAJE DE QUE LO DESUBRAYE ANTES

                // const newHighlight = extendStartEnd({plainText,range,spanCloseTag,spanOpenTag,userSeleccion})
                // if (!newHighlight) return


                // const stateCopy = [...highlightedContent]
                // stateCopy[Number(paragraphIdx)] = newHighlight
                // setHighlightedContent(stateCopy)
                
            }
            
            
            

            return
        }


        const copy = [...highlightedContent]
        copy[Number(paragraphIdx)] = newHtml

        setHighlightedContent(copy)

    }
    


    function removeHighlight() {        
        console.log("remove Highlight");
        

        //SE REPITE MUCHO CODIGO
        const range = window.getSelection()?.getRangeAt(0)
        const toRemoveTxt = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
        if (!toRemoveTxt) return

        const classToSearch =range?.startContainer?.nextSibling?.className ?? range?.startContainer.parentElement?.className

        const spanOpenToSearch = `<span class="${classToSearch}">`

        const toSearch = spanOpenToSearch+toRemoveTxt+spanCloseTag
        
        const paragraph= range?.startContainer.parentElement?.closest("p")

        const paragraphIdx = paragraph?.getAttribute('data-index') || ""

        const firstIdx = highlightedContent[Number(paragraphIdx)].indexOf(toSearch)
        const lastIdx =  highlightedContent[Number(paragraphIdx)].lastIndexOf(toSearch)

        if (firstIdx === -1) return

        //Si la palabra esta repetida
        if (firstIdx !== lastIdx){
            let fullPreviousContent = ""
            let currentElmnt = range?.commonAncestorContainer.parentElement?.previousSibling

            while (currentElmnt) {
                fullPreviousContent = currentElmnt.textContent + fullPreviousContent

                currentElmnt = currentElmnt.previousSibling
            }


            let nOcurrences = 1
            let fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt)

            while (fullPreviousIdx !== -1) {
                fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt, fullPreviousIdx + 1)
                nOcurrences++
            }

            let currentWord= 1
            let realIdx= highlightedContent[Number(paragraphIdx)].indexOf(toRemoveTxt)

            while (currentWord !== nOcurrences) {
                realIdx= highlightedContent[Number(paragraphIdx)].indexOf(toRemoveTxt, realIdx + 1)

                currentWord++
            }
        

            const firsPart = highlightedContent[Number(paragraphIdx)].slice(0, realIdx - spanOpenToSearch.length)

            const lastPart = highlightedContent[Number(paragraphIdx)].slice(realIdx + toRemoveTxt.length + spanCloseTag.length)

            const copy = [...highlightedContent]
            copy[Number(paragraphIdx)] = firsPart+toRemoveTxt+lastPart

            setHighlightedContent(copy)   
            return  
            
        }
        

        const firsPart = highlightedContent[Number(paragraphIdx)].slice(0, firstIdx)
        const lastPart = highlightedContent[Number(paragraphIdx)].slice(firstIdx+ spanOpenToSearch.length + toRemoveTxt?.length)


        
        const copy = [...highlightedContent]
        copy[Number(paragraphIdx)] = firsPart+toRemoveTxt+lastPart
        setHighlightedContent(copy)
        
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
            <CopySVG onMouseDown={()=>{copyTxt({setAlert})}}/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG onMouseDown={googleSearch}/>
        </section>
    )
}
