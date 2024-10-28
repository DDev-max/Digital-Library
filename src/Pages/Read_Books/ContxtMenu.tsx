import { copyTxt } from "../../Utils/copyTxt.tsx";
import { googleSearch } from "../../Utils/googleSearch.tsx";
import { removeHighlight } from "./removeHighlight.tsx";
import { highlightColor } from "./highlightColor.tsx";
import { ColorsMenu } from "./ColorsMenu.tsx";
import { useMenuPosition } from "./useMenuPosition.tsx";

import { CopySVG } from "../../components/svg/CopySVG.tsx";
import { SearchSVG } from "../../components/svg/SearchSVG.tsx";
import { useHighlightCntxt } from "../../Context/useHighlightContxt.tsx";

//ELIMINAR LOS ARCHIVOS/ CARPETAS QUE NO ESTOY USANDO

export function ContxtMenu() {

    const {position,setPosition} = useMenuPosition()

    const context = useHighlightCntxt()
    if (!context) return

    const {highlightedContent, setHighlightedContent, setAlert} = context


    return(
        
        position && 
        <section style={{...position}} className="contextMenu">

            <ColorsMenu 
            onClickColor={(e)=>{
                highlightColor({e,highlightedContent,setAlert,setHighlightedContent,setPosition})
            }}
            
            onUnselectClick={()=> {
                removeHighlight({fromHighlight: false,highlightedContent,setHighlightedContent,setPosition})
            }}
            
            />


            <div className="contextMenu_btnsCont">
                <CopySVG classNameBtn="contextMenu_copyBtn" onMouseDown={()=>{copyTxt({setAlert})}}/>
                    
                <SearchSVG classNameBtn="contextMenu_searchbtn" onMouseDown={googleSearch}/>
            </div>

        </section>
    )
}
