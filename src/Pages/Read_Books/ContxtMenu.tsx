import { useContext } from "react";

import { HighlightedCntxt } from "../../contextAPI.tsx";

import { copyTxt } from "../../Utils/copyTxt.tsx";
import { googleSearch } from "../../Utils/googleSearch.tsx";
import { removeHighlight } from "./removeHighlight.tsx";
import { highlightColor } from "./highlightColor.tsx";
import { ColorsMenu } from "./ColorsMenu.tsx";
import { useMenuPosition } from "./useMenuPosition.tsx";

import { CopySVG } from "../../components/svg/CopySVG.tsx";
import { SearchSVG } from "../../components/svg/SearchSVG.tsx";

//ELIMINAR LOS ARCHIVOS/ CARPETAS QUE NO ESTOY USANDO

export function ContxtMenu() {

    const {position,setPosition} = useMenuPosition()

    //quizas es mejor prop drilling si solo la uso aqui
    const {highlightedContent, setHighlightedContent, setAlert} = useContext(HighlightedCntxt)


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


            <div>
                <CopySVG onMouseDown={()=>{copyTxt({setAlert})}}/>
                <SearchSVG onMouseDown={googleSearch}/>
            </div>

        </section>
    )
}
