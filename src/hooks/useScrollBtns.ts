import { useEffect, useState } from "react";

//ARREGLAR
export function useScrollBtns(sliderRef:  React.RefObject<HTMLDivElement>){
    
    const [showBtns, setShowBtns] = useState([false, true])

    useEffect(()=>{
        const slider = sliderRef?.current
        if(!slider) return

        const toggleBtns = ()=>{

            const scrollLeft = slider.scrollLeft;
            const scrollWidth = slider.scrollWidth;
            const clientWidth = slider.clientWidth;

            const showLeftBtn = scrollLeft > 0;
            const showRightBtn = scrollLeft < (scrollWidth - clientWidth);

            setShowBtns([showLeftBtn, showRightBtn]);

        }


        slider.addEventListener("scrollend", toggleBtns)


        return ()=>{
            slider!.removeEventListener("scrollend", toggleBtns)

        }
    }, [sliderRef])

    return showBtns

}