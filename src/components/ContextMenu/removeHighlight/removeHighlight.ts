import type { BookContentState } from "data/types"
import { highlightTagWords, regexSpecialCharacters, spanCloseTag } from "../../../data/consts"
import { getPreviousContent } from "Utils/getPreviousContent/getPreviousContent"

interface removeHighlightProps extends Pick<BookContentState, "bookContent"> {
    highlightToRemove: string
    spanOpenHighlight: string
    paragraphIdx: number
}


//error cuando se le da a borrar a un texto sin highlight

//REFACTORIZAR
export function removeHighlight({ highlightToRemove, bookContent, spanOpenHighlight, paragraphIdx }: removeHighlightProps) {

    const toSearch = spanOpenHighlight + highlightToRemove + spanCloseTag

    const firstIdx = bookContent[paragraphIdx].indexOf(toSearch)
    const lastIdx = bookContent[paragraphIdx].lastIndexOf(toSearch)



    if (firstIdx === -1) return

    if (firstIdx !== lastIdx) {
        const escapedHighlight = new RegExp(highlightToRemove.replace(regexSpecialCharacters, '\\$&'))


        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = bookContent[paragraphIdx]
        if (!tempDiv.textContent) return

        let plainTextCurrentIdx = tempDiv.textContent.indexOf(highlightToRemove)

        const range = window.getSelection()?.getRangeAt(0)
        if (!range?.commonAncestorContainer.parentElement) return

        const { fullPreviousHtml, fullPreviousPlainText } = getPreviousContent(range.commonAncestorContainer.parentElement.previousSibling)

        let matchesPlainText = 1

        while (plainTextCurrentIdx !== range?.startOffset + fullPreviousPlainText.length) {
            plainTextCurrentIdx = tempDiv.textContent?.indexOf(highlightToRemove, plainTextCurrentIdx + 1)
            matchesPlainText++

        }



        let nWordsMatchSpanTagHtml = 0
        
        const completeWordRegex = new RegExp(`\\b\\w*${escapedHighlight.source}\\w*\\b`, 'g')

        const matchesRegex = Array.from(fullPreviousHtml.matchAll(completeWordRegex))


        for (const element of matchesRegex) {
            if (highlightTagWords.test(element[0])) {                
                nWordsMatchSpanTagHtml++
            }
        }




        //reutilizar? 
        function getNthOccurrenceIndex(regex, texto, matchNumber): number {
            let contador = 0;
            let match;



            while ((match = regex.exec(texto)) !== null) {
                contador++;
                if (contador === matchNumber) {
                    return match.index;
                }
            }

            return -1;
        }


        const PINGA = new RegExp(highlightToRemove.replace(regexSpecialCharacters, '\\$&'), 'g')


        const firstIdx = getNthOccurrenceIndex(PINGA, bookContent[paragraphIdx], (nWordsMatchSpanTagHtml > 0 ? nWordsMatchSpanTagHtml + 1 : nWordsMatchSpanTagHtml) + matchesPlainText);



        const firsPart = bookContent[paragraphIdx].slice(0, firstIdx - spanOpenHighlight.length)
        const lastPart = bookContent[paragraphIdx].slice(firstIdx + highlightToRemove.length + spanCloseTag.length)


        return firsPart + highlightToRemove + lastPart


    }


    const firsPart = bookContent[paragraphIdx].slice(0, firstIdx)
    const lastPart = bookContent[paragraphIdx].slice(firstIdx + spanOpenHighlight.length + highlightToRemove.length + spanCloseTag.length)

    return firsPart + highlightToRemove + lastPart


}

