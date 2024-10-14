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
import { copyTxt } from "../Services/copyTxt.tsx";
import { googleSearch } from "../Services/googleSearch.tsx";
import { getPreviousContent } from "../Services/getPreviousContent.tsx";



const spanCloseTag = "</span>"

//ERROR AL SELECCIONAR ESPACIOS EN BLANCO POCAS LETRAS O ESPACIOS EN BLANCO " "
//Ocurre cuando solo se selecciona una letra y esa letra justo coincide con la etiqueta span


export function ContxtMenu() {
    const [position, setPosition] =  useState({}) 
    const [visibility, setVisibility] = useState(false)//QUITAR Y ENVEZ DE ESO RETORNAR DISPLAY NONE?
    
    const {highlightedContent, setHighlightedContent, setAlert} = useContext(HighlightedCntxt)


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



    function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {

        const eTarget = e.target as HTMLElement
        const wSelect = window.getSelection()
        const range = wSelect?.getRangeAt(0)
        const userSeleccion =  wSelect?.toString()
        if (!userSeleccion) return

        const spanOpenTag = `<span class="${eTarget.classList[1]}">`
        const spanOpenRegex = /<span class="contextMenu_color--(first|second|third|fourth)">/g
        const spanCloseRegex = /<\/span>/g

        const emptySpanRegex = /<span class="contextMenu_color--(first|second|third|fourth)"><\/span>/g


        const paragraphIdx = range?.commonAncestorContainer.nodeName === "#text"
        ? Number(range.commonAncestorContainer.parentElement?.closest('p')?.getAttribute('data-index'))
        : Number((range?.commonAncestorContainer as HTMLElement).getAttribute('data-index'))
        

        //Si se seleccionan dos parrafos a la vez
        if ((range?.commonAncestorContainer as HTMLElement).className == "paragraphsContainer" ){     
            console.log("Dentro de dos parrafos");
                       
            setAlert("Please select one paragraph at a time")
            
            setTimeout(() => {
                setAlert("")
            }, 2000);
            return        
        }

        const selectedParagraph = highlightedContent[paragraphIdx]

        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = selectedParagraph

        const fullPlainTxt = tempDiv.textContent

        let newHtml = highlightPlainText({userSeleccion ,range, spanOpenTag, spanCloseTag,  htmlContent: selectedParagraph, fullPlainTxt})

        
        //SI NO DEVUELVE NUEVO HTML, ES POR QUE SE SELECCIONO TEXTO QUE YA ESTA SUBRAYADO CON TEXTO PLANO
        if (!newHtml && !isNaN(paragraphIdx)) {
            
            let bothTags = true
            for (let i = 0; i <= userSeleccion.length; i++) {
                const selectionFirstPart = userSeleccion.slice(0, i);
                const selectionLastPart = userSeleccion.slice(i);
            
                const textSpanOpenRegex = new RegExp(`${selectionFirstPart}${spanOpenRegex.source}${selectionLastPart}`)
                const textSpanCloseRegex = new RegExp(`${selectionFirstPart}${spanCloseRegex.source}${selectionLastPart}`)
            
                const hasSpanOpen = textSpanOpenRegex.exec(selectedParagraph)
                const hasSpanClose = textSpanCloseRegex.exec(selectedParagraph)                

                if (hasSpanOpen || hasSpanClose) {  
                    

                    newHtml = hasSpanOpen
                    ? extendHighlightStart({hasSpanOpen, selectedParagraph,spanCloseTag,spanOpenRegex,spanOpenTag})
                    : extendHighlightEnd({hasSpanClose,selectedParagraph,spanCloseTag,spanOpenTag, spanOpenRegex})

                    if (!newHtml || newHtml.match(emptySpanRegex)) return
                    
                    bothTags = false
                    break
                }


            }

            if (bothTags) {
                const paragraphNoHighlight = removeHighlight(true)
                if (!paragraphNoHighlight) return
                
                newHtml = highlightPlainText({fullPlainTxt,range,spanCloseTag,spanOpenTag,userSeleccion, htmlContent: paragraphNoHighlight})
            }

        }

        // if (!newHtml) return

        //PONER QUE SI SE DEVUELVE UN TXTCONTENT DIFERENTE, RETURN

        const copy = [...highlightedContent]

        //REUTILIZAR EL DE ARRIBA?
        const tempElmnt = document.createElement("div")
        tempElmnt.innerHTML = newHtml

        if (tempElmnt.textContent != fullPlainTxt || !newHtml) {
            // Ocurre cuando se quiere extender el subrayado de etiquetas de diferentes colores
            setAlert("First try removing the highlighting from the selection.")

            setTimeout(() => {
                setAlert("")
            }, 2000);
            return
            
        }

        copy[paragraphIdx] = newHtml
        setHighlightedContent(copy)
        return

   
    }
    


    function removeHighlight(fromHighlight: boolean) {        
        
        //SE REPITE MUCHO CODIGO
        const range = window.getSelection()?.getRangeAt(0)

        const toRemoveTxt = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
                
        
        if (!toRemoveTxt) return
 
        
        const classToSearch =range?.startContainer.parentElement?.className ||(range?.startContainer?.nextSibling as HTMLElement).className        
        

        const spanOpenToSearch = `<span class="${classToSearch}">`

        const toSearch = spanOpenToSearch+toRemoveTxt+spanCloseTag
        
        const paragraph= range?.startContainer.parentElement?.closest("p")

        const paragraphIdx = Number(paragraph?.getAttribute('data-index'))

        const firstIdx = highlightedContent[paragraphIdx].indexOf(toSearch)
        const lastIdx =  highlightedContent[paragraphIdx].lastIndexOf(toSearch)


        if (firstIdx === -1) return

        //Si la palabra esta repetida
        if (firstIdx !== lastIdx){
            const fullPreviousContent = getPreviousContent(range?.startContainer.previousSibling)

            //getPreviousContent(range?.commonAncestorContainer.parentElement?.previousSibling)
            
            let nOcurrences = 1
            let fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt) // Se busca el indice DENTRO DEL TEXTO PLANO

            console.log(fullPreviousContent);
            

            while (fullPreviousIdx !== -1) {
                fullPreviousIdx = fullPreviousContent.indexOf(toRemoveTxt, fullPreviousIdx + 1)
                nOcurrences++
            }

            console.log("palabra numero ", nOcurrences," dentro del texto plano");
            

            let currentWord= 1
            let realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt)

            while (currentWord !== nOcurrences) {
                realIdx= highlightedContent[paragraphIdx].indexOf(toRemoveTxt, realIdx + 1)

                currentWord++
            }
        
            console.log("numero dentro del html: ",currentWord);
            

            const firsPart = highlightedContent[paragraphIdx].slice(0, realIdx - spanOpenToSearch.length)

            const lastPart = highlightedContent[paragraphIdx].slice(realIdx + toRemoveTxt.length + spanCloseTag.length)

            if (fromHighlight) {
                return firsPart+toRemoveTxt+lastPart
            }

            const copy = [...highlightedContent]
            copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart

            setHighlightedContent(copy)   
            return  
            
        }
        
        const firsPart = highlightedContent[paragraphIdx].slice(0, firstIdx)
        const lastPart = highlightedContent[paragraphIdx].slice(firstIdx+ spanOpenToSearch.length + toRemoveTxt?.length + spanCloseTag.length)

        
        const copy = [...highlightedContent]
        copy[paragraphIdx] = firsPart+toRemoveTxt+lastPart

        console.log(firsPart);
        console.log(toRemoveTxt);
        console.log(lastPart);
        
        


        if (fromHighlight) {
            return firsPart+toRemoveTxt+lastPart
        }

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

                <button onClick={()=>{removeHighlight(false)}} className="contextMenu_unselectBtn">
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
