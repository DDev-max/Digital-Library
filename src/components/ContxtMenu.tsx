import { useEffect, useState } from "react";
import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";

export function ContxtMenu() {
    const [position, setPosition] =  useState([0,0])
    const [visibility, setVisibility] = useState(false)


    useEffect(()=>{
        const moveContextMenu = (e: MouseEvent)=>{
            e.preventDefault()
            console.log(e.clientX, e.clientY);
            setPosition([e.clientX, e.clientY])
            setVisibility(true)
            
        }

        const hideContextMenu = (e: MouseEvent)=>{
            const eTarget = e.target as HTMLElement
            
            console.log(e);
            
            if (typeof eTarget.className === "string" && !eTarget.className.includes("contextMenu")) {
                setVisibility(false)
            }
        }



        document.addEventListener("contextmenu", moveContextMenu)
        document.addEventListener("click", hideContextMenu)

        return ()=> {
            document.removeEventListener("click", hideContextMenu)
            document.removeEventListener("contextmenu", moveContextMenu)
        }


    
    }, [])


    return(
        
        visibility && <section style={{left: position[0], top:position[1]}} className="contextMenu">
            <div className="contextMenu_ColorsCont">
                <button className="contextMenu_color contextMenu_color--first"></button>
                <button className="contextMenu_color contextMenu_color--second"></button>
                <button className="contextMenu_color contextMenu_color--third"></button>
                <button className="contextMenu_color contextMenu_color--fourth"></button>
            </div>
            <CopySVG/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG/>
        </section>
    )
}