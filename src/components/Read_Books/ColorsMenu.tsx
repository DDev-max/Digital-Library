import { UnselectSVG } from "../../components/svg/UnselectSVG";

interface ColorsMenuProps{
    onClickColor: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onUnselectClick: () => void
}


export function ColorsMenu({onClickColor,onUnselectClick}: ColorsMenuProps) {

    const colors = ["first","second","third","fourth"]

    return (
        <div className="contextMenu_ColorsCont">
        {
            colors.map((elmnt, idx)=>{
                return(
                    <button
                    role="menuitem"
                    aria-label={`Color number ${idx +1}`}
                    key={idx} 
                    className={`contextMenu_color contextMenu_color--${elmnt}`} 
                    onClick={onClickColor}>
                    </button>
                )
            })
        }

        <UnselectSVG
        classNameBtn="contextMenu_unselectBtn"
        onClick={onUnselectClick}
        classNameSVG="contextMenu_unselectSVG"
        />
        
    </div>
    );
}