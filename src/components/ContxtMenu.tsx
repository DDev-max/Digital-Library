import { CSSProperties, useContext, useEffect, useState } from "react";
import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";
import { menuSize} from "../consts.ts"
import { UnselectSVG } from "../svg/UnselectSVG.tsx";
import { HighlightedCntxt } from "../contextAPI.tsx";
import { copyTxt } from "../Services/copyTxt.tsx";
import { googleSearch } from "../Services/googleSearch.tsx";
import { removeHighlight } from "../Services/Highlight/removeHighlight.tsx";
import { highlightColor } from "../Services/Highlight/highlightColor.tsx";
import { ShowMeaning } from "../Services/ShowMeaning.tsx"

//ELIMINAR LOS ARCHIVOS/ CARPETAS QUE NO ESTOY USANDO

export function ContxtMenu() {
    const [position, setPosition] =  useState<CSSProperties>() 
    //quizas es mejor prop drilling si solo la uso aqui
    const {highlightedContent, setHighlightedContent, setAlert} = useContext(HighlightedCntxt)

    const colors = ["first","second","third","fourth"]

    //events handler:
    useEffect(()=>{
        const hideContextMenu = (e: Event)=>{
            const eTarget = e.target as HTMLElement
                        
            // para pasignarle la misma funcion a ambos eventos (ver los eventos añadidos)
            if (e.type === "scroll") setPosition({display: "none"})

            if (typeof eTarget.className === "string" && !eTarget.className.includes("contextMenu")) {
                setPosition({display: "none"})
            }
        }

        const moveContextMenu = (e: MouseEvent)=>{
          
            const isSelected = window.getSelection()?.toString() != ""

            const commonAncestor = window.getSelection()?.getRangeAt(0).commonAncestorContainer as HTMLElement

            if (commonAncestor.id === "root" 
                || commonAncestor.nodeName === "MAIN" 
                || !isSelected ) {
                return
            }
            
            
            e.preventDefault()


            const menuPosition: CSSProperties = {
                right: e.pageX + menuSize > window.innerWidth? 0: "auto",
                left: e.pageX + menuSize > window.innerWidth? "auto": e.pageX,
                
                top: e.clientY + menuSize > window.innerHeight? "auto": e.clientY,
                bottom: e.clientY + menuSize > window.innerHeight? 0: "auto",

                display: "block"

            }

            setPosition(menuPosition)
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


    return(
        
        position && 
        <section style={{...position}} className="contextMenu">
            <div className="contextMenu_ColorsCont">
                {
                    colors.map((elmnt, idx)=>{
                        return(
                            <button 
                            key={idx} 
                            className={`contextMenu_color contextMenu_color--${elmnt}`} 
                            onClick={(e)=> highlightColor({e,highlightedContent,setAlert,setHighlightedContent, setPosition})}>
                            </button>
                        )
                    })
                }

                <button onClick={()=>{removeHighlight({highlightedContent,setHighlightedContent, fromHighlight: false, setPosition})}} className="contextMenu_unselectBtn">
                    <UnselectSVG className="contextMenu_unselectSVG"/>
                </button>
                
            </div>
            <CopySVG onMouseDown={()=>{copyTxt({setAlert})}}/>
            <AudioSVG/>
            <DictionarySVG onClick={ShowMeaning}/>
            <SearchSVG onMouseDown={googleSearch}/>
        </section>
    )
}
