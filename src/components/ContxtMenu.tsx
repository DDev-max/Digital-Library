import { AudioSVG } from "../svg/AudioSVG";
import { CopySVG } from "../svg/CopySVG";
import { DictionarySVG } from "../svg/DictionarySVG";
import { SearchSVG } from "../svg/SearchSVG";

export function ContxtMenu() {
    return(
        <section className="contextMenu">
            <div className="contextMenu_ColorsCont">
                <button className="contextMenu_color contextMenu_color--first"></button>
                <button className="contextMenu_color contextMenu_color--second"></button>
                <button className="contextMenu_color contextMenu_color--third"></button>
                <button className="contextMenu_color contextMenu_color--fourth"></button>
            </div>
            <CopySVG/>
            <AudioSVG/>
            <DictionarySVG/>
            <SearchSVG/>
        </section>
    )
}