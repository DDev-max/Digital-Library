import { useQueryClient } from "@tanstack/react-query"
import { CopySVG } from "../../components/svg/CopySVG"
import { SearchSVG } from "../../components/svg/SearchSVG"
import { useHighlightCntxt } from "../../Context/useHighlightContxt"
import { useLorem } from "../../hooks/useLorem"
import { ColorsMenu } from "./ColorsMenu"
import { highlightColor } from "./highlightColor"
import { removeHighlight } from "./removeHighlight"
import { useMenuPosition } from "./useMenuPosition"
import { useRef } from "react"
import { copyTxt } from "../../Utils/copyTxt.ts"
import { googleSearch } from "../../Utils/googleSearch.ts"



export function ContxtMenu() {

    const {data} = useLorem()
    const queryClient = useQueryClient()

    const menuRef = useRef<HTMLElement | null>(null)

    
    
    const {position,setPosition} = useMenuPosition(menuRef)

    const context = useHighlightCntxt()
    if (!context || !data) return

    const { setAlert} = context 



    return(
        
        position && 
        <section ref={menuRef} role="menu" style={{...position}} className="contextMenu">

            <ColorsMenu
            onClickColor={(e)=>{
                highlightColor({e,data,setAlert,setPosition,queryClient})
            }}
            
            onUnselectClick={()=> {
                removeHighlight({fromHighlight: false,data,setPosition,queryClient})
            }}
            
            />


            <div className="contextMenu_btnsCont">
                <CopySVG classNameBtn="contextMenu_copyBtn" onMouseDown={()=>{copyTxt({setAlert})}}/>
                    
                <SearchSVG title="Search on Google" classNameBtn="contextMenu_searchbtn" onMouseDown={googleSearch}/>
            </div>

        </section>
    )
}
