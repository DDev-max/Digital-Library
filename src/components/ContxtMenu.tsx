import { useEffect, useState } from "react";
import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";

export function ContxtMenu() {
    const [position, setPosition] =  useState({})
    const [visibility, setVisibility] = useState(false)

    //HACER QUE SE PUEDAN SUBRAYAR VARIOS PARRAFOS A LA VEZ
    //HACER QUE EL CONTEXT MENU NO SE VAYA FUERA DE LA PANTALLA CUANDO SE HACE CLICK CERCA DE LOS BORDES

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


            console.log(e.pageY, e.clientY, e.offsetY, e.y, e.movementY);
            //MAGIC STRING
            const menuPosition = {
                right: e.pageX + 160 > window.innerWidth? 0: "auto",
                left: e.pageX + 160 > window.innerWidth? "auto": e.pageX,
                
                top: e.clientY + 160 > window.innerHeight? "auto": e.clientY,
                bottom: e.clientY + 160 > window.innerHeight? 0: "auto"

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



    function highilightColor(e: React.MouseEvent<HTMLButtonElement>) {
        const wSelect =  window.getSelection()
        const userSelection = wSelect?.toString()

        if (userSelection && userSelection.length >0) {
            const eTarget = e.target as HTMLElement

            const range = wSelect?.getRangeAt(0)
            const span =  document.createElement("span")
            span.className = eTarget.classList[1]
            range?.surroundContents(span)
            wSelect?.removeAllRanges()
        }

        setVisibility(false)
        
    }

    return(
        
        visibility && 
        <section style={{...position}} className="contextMenu">
            <div className="contextMenu_ColorsCont">
                <button onClick={(e)=> highilightColor(e)} className="contextMenu_color contextMenu_color--first"></button>
                <button onClick={(e)=> highilightColor(e)} className="contextMenu_color contextMenu_color--second"></button>
                <button onClick={(e)=> highilightColor(e)} className="contextMenu_color contextMenu_color--third"></button>
                <button onClick={(e)=> highilightColor(e)} className="contextMenu_color contextMenu_color--fourth"></button>
            </div>
            <CopySVG/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG/>
        </section>
    )
}