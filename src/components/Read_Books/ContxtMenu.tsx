import { CopySVG } from "../../components/svg/CopySVG"
import { SearchSVG } from "../../components/svg/SearchSVG"
import { ColorsMenu } from "./ColorsMenu"
import { highlightColor } from "./highlightColor"
import { removeHighlight } from "./removeHighlight"
import { useMenuPosition } from "./useMenuPosition"
import { useRef } from "react"
import { googleSearch } from "Utils/googleSearch"
import { copyTxt } from "Utils/copyTxt"
import { ContxtMenuProps } from "data/types"


export function ContxtMenu({highlightedContent,setHighlightedContent, setAlert, paragraphContainer}:ContxtMenuProps) {

    const menuRef = useRef<HTMLDivElement | null>(null)
    const {position,setPosition} = useMenuPosition(menuRef)

    
    return(
        
        position && 
        <div ref={menuRef} role="menu" style={{...position}} className="contextMenu">

            <ColorsMenu
            onClickColor={(e)=>{
                highlightColor({e,highlightedContent,setAlert,setHighlightedContent,setPosition, paragraphContainer})
            }}
            
            onUnselectClick={()=> {
                removeHighlight({fromHighlight: false,highlightedContent,setPosition,setHighlightedContent})
            }}
            
            />


            <div className="contextMenu_btnsCont">
                <CopySVG classNameBtn="contextMenu_copyBtn" onMouseDown={()=>{copyTxt({setAlert})}}/>
                    
                <SearchSVG title="Search on Google" classNameBtn="contextMenu_searchbtn" onMouseDown={googleSearch}/>
            </div>

        </div>
    )
}
