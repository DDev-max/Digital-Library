import { CopySVG } from "../svg/CopySVG"
import { SearchSVG } from "../svg/SearchSVG"
import { ColorsMenu } from "./ColorsMenu"
import { highlightColor } from "./highlightColor"
import { removeHighlight } from "./removeHighlight"
import { useMenuPosition } from "./useMenuPosition"
import { RefObject, useEffect, useRef } from "react"
import { googleSearch } from "Utils/googleSearch"
import { copyTxt } from "Utils/copyTxt"
import type { AlertState, HighlightedContentState } from "data/types"

interface ContxtMenuProps extends HighlightedContentState, Pick<AlertState, "setAlert"> {
    paragraphContainer: RefObject<HTMLDivElement>
}



export function ContxtMenu({ highlightedContent, setHighlightedContent, setAlert, paragraphContainer }: ContxtMenuProps) {

    const menuRef = useRef<HTMLDivElement | null>(null)
    const { position, setPosition } = useMenuPosition({menuRef, paragraphContainer})

    useEffect(() => {
        if (position?.display === 'block' && menuRef.current) {
            menuRef.current.focus();
        }
      }, [position]); 

    return (

        position &&
        <div tabIndex={0} onKeyDown={(e)=>{if(e.key=="Escape")setPosition(undefined)}} ref={menuRef} role="menu" style={{ ...position }} className={`contextMenu`}>

            <ColorsMenu
                onClickColor={(e) => {
                    highlightColor({ e, highlightedContent, setAlert, setHighlightedContent, setPosition, paragraphContainer })
                }}

                onUnselectClick={() => {
                    removeHighlight({ fromHighlight: false, highlightedContent, setPosition, setHighlightedContent })
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
