import { copyTxt } from "../../Utils/copyTxt.tsx";
import { googleSearch } from "../../Utils/googleSearch.tsx";
import { removeHighlight } from "./removeHighlight.tsx";
import { highlightColor } from "./highlightColor.tsx";
import { ColorsMenu } from "./ColorsMenu.tsx";
import { useMenuPosition } from "./useMenuPosition.tsx";

import { CopySVG } from "../../components/svg/CopySVG.tsx";
import { SearchSVG } from "../../components/svg/SearchSVG.tsx";
import { useHighlightCntxt } from "../../Context/useHighlightContxt.tsx";
import { useLorem } from "../../hooks/useLorem.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { URLorem } from "../../data/consts.ts";

//ELIMINAR LOS ARCHIVOS/ CARPETAS QUE NO ESTOY USANDO

export function ContxtMenu() {

    const {data} = useLorem()
    const queryClient = useQueryClient()

    const {position,setPosition} = useMenuPosition()

    const context = useHighlightCntxt()
    if (!context || !data) return

    const { setAlert} = context 


    function changeContent(newData: string[]) {
        console.log("llamada al cache");
        
        queryClient.setQueryData(["LoremIpsum", URLorem], newData)
    }


    return(
        
        position && 
        <section style={{...position}} className="contextMenu">

            <ColorsMenu 
            onClickColor={(e)=>{
                highlightColor({e,data,setAlert,changeContent,setPosition})
            }}
            
            onUnselectClick={()=> {
                removeHighlight({fromHighlight: false,data,changeContent,setPosition})
            }}
            
            />


            <div className="contextMenu_btnsCont">
                <CopySVG classNameBtn="contextMenu_copyBtn" onMouseDown={()=>{copyTxt({setAlert})}}/>
                    
                <SearchSVG classNameBtn="contextMenu_searchbtn" onMouseDown={googleSearch}/>
            </div>

        </section>
    )
}
