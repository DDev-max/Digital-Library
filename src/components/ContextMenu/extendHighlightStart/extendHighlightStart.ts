import { spanCloseTag, spanOpenRegex } from "data/consts"
import type { extendHighlight } from "data/types"


interface extendHighlightStartProps extends Pick<extendHighlight ,"spanOpenTag">{
    matchedOpeningSpan: RegExpExecArray | null
}


export function extendHighlightStart({matchedOpeningSpan,spanOpenTag}:extendHighlightStartProps){
//LO MISMO QUE EL DEL END
    

    if(!matchedOpeningSpan) return
    
    const searchSpan = spanOpenRegex.exec(matchedOpeningSpan[0])
    if (!searchSpan) return

    const presentSpan = matchedOpeningSpan[0].slice(searchSpan?.index, searchSpan?.index + searchSpan?.[0].length)
    
    const sameColor = matchedOpeningSpan[0].includes(spanOpenTag)

    const noOpeningTag = matchedOpeningSpan[0].replace(spanOpenRegex, "")


    const newHighlight = sameColor
    ? `${spanOpenTag}${noOpeningTag}`
    : `${spanOpenTag}${noOpeningTag}${spanCloseTag}`

    const htmlSelectionStart = matchedOpeningSpan.index
    const htmlSelectionEnd = htmlSelectionStart + matchedOpeningSpan[0].length
    
    const firstPart = matchedOpeningSpan.input.slice(0, htmlSelectionStart)
    const lastPart= matchedOpeningSpan.input.slice(htmlSelectionEnd)
    
    const newHtml = sameColor
    ? firstPart+newHighlight+lastPart
    : firstPart+newHighlight+presentSpan+lastPart
        

    return newHtml
}