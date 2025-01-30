import { CopySVG } from "../svg/CopySVG"
import { SearchSVG } from "../svg/SearchSVG"
import { ColorsMenu } from "./ColorsMenu"
import { highlightParagraph } from "./highlightParagraph"
import { removeHighlight } from "./removeHighlight/removeHighlight"
import { useMenuPosition } from "./useMenuPosition"
import { RefObject, useEffect, useRef } from "react"
import { googleSearch } from "Utils/googleSearch"
import { copyTxt } from "Utils/copyText/copyTxt"
import type { AlertState, BookContentState } from "data/types"
import { getParagraphIdx } from "./getParagraphIdx"

interface ContxtMenuProps extends BookContentState, Pick<AlertState, "setAlert"> {
    paragraphContainer: RefObject<HTMLDivElement>
}


//SEPARAR LOGICA DE COMPONENTES

export function ContxtMenu({ bookContent,setBookContent,setAlert, paragraphContainer }: ContxtMenuProps) {

    const menuRef = useRef<HTMLDivElement | null>(null)
    const { position, setPosition } = useMenuPosition({ menuRef, paragraphContainer })

    useEffect(() => {
        if (position?.display === 'block' && menuRef.current) {
            menuRef.current.focus();
        }
    }, [position]);

    return (

        position &&
        <div tabIndex={0} onKeyDown={(e) => { if (e.key == "Escape") setPosition(undefined) }} ref={menuRef} role="menu" style={{ ...position }} className={`contextMenu`}>

            <ColorsMenu
                onClickColor={(e) => {
                    highlightParagraph({ e, bookContent, setAlert, setBookContent, setPosition, paragraphContainer })
                }}

                onUnselectClick={() => {
                    //REPETIDO EN HIGHLIGHT AGAIN. VER SI LOS PARAMETROS PUEDEN SER LIGERAMENTE DISTINTOS

                    const range = window.getSelection()?.getRangeAt(0)
                    const highlightToRemove = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
                    if (!highlightToRemove) return

                    const classToSearch = range?.startContainer.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement).className || undefined

                    const spanOpenHighlight = `<span class="${classToSearch}">`


                    const paragraphIdx =  getParagraphIdx({paragraphContainer})
                    const noHighlight = removeHighlight({  htmlParagraph: bookContent[paragraphIdx],highlightToRemove, spanOpenHighlight })
                    setPosition({display: "none"})


                    const copy = [...bookContent]
                    
                    if(!noHighlight) return
                    copy[paragraphIdx] = noHighlight

                    setBookContent(copy)

                }}

            />


            <div className={`contextMenu_btnsCont`}>
                <CopySVG onMouseDown={() => { copyTxt({ setAlert }) }} />

                <button aria-label="Search on Google">
                    <SearchSVG onClick={googleSearch} />
                </button>
            </div>

        </div>
    )
}
