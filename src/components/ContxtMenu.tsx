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



    function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {
        const noHTMLTxt:string[] = []

        highlightedContent.forEach(elmnt=>{
            const tempElement = document.createElement("p")
            tempElement.innerHTML = elmnt
            if (!tempElement.textContent) return
        
            noHTMLTxt.push(tempElement.textContent)
        })


        const eTarget = e.target as HTMLElement

        const wSelect = window.getSelection()
        const range = wSelect?.getRangeAt(0)
        const start = range?.startOffset
        const end = range?.endOffset

        const parentElement = range?.startContainer.parentElement?.parentElement
        const paragraphIndex = parentElement?.getAttribute("data-index")

        const selectedParagraph = noHTMLTxt[Number(paragraphIndex)]
        
        const userSelection = selectedParagraph.slice(start, end)

        const firstPart = selectedParagraph.slice(0, start)
        const lastPart = selectedParagraph.slice(end)

        console.log(firstPart);
        console.log(userSelection);
        console.log(lastPart);

        const textHighlighted = `<p>${firstPart}<span class="${eTarget.classList[1]}">${userSelection}</span>${lastPart}</p>`

        console.log(textHighlighted);
        

        const newContent = [...highlightedContent]
        newContent[Number(paragraphIndex)] = textHighlighted

        setHighlightedContent(newContent)
        
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



// function highlightColor(e: React.MouseEvent<HTMLButtonElement>) {
//     const wSelect = window.getSelection();
//     const userSelection = wSelect?.toString();

//     if (userSelection && userSelection.length > 0) {
//         const eTarget = e.target as HTMLElement;
//         const range = wSelect?.getRangeAt(0);

//         const selectionCopy = range?.cloneContents();
//         if (selectionCopy) {
//             const highlightedTxts = selectionCopy.querySelectorAll('span[class^="contextMenu_color--"]')
            

//             highlightedTxts.forEach(element => {
//                 const parent = element.parentNode;
//                 while (element.firstChild) {
//                     parent?.insertBefore(element.firstChild, element);
//                 }
//                 parent?.removeChild(element)
//             })


//             range?.deleteContents();

//             const span = document.createElement("span");
//             span.className = eTarget.classList[1];
//             span.appendChild(selectionCopy);

//             range?.insertNode(span);
//         }

//         wSelect?.removeAllRanges();
//     }

//     setVisibility(false);
// }