import {getPreviousContent} from "Utils/getPreviousContent/getPreviousContent";
import { removeHighlight } from "./removeHighlight"

const spanOpenHighlight = '<span class="contextMenu_color--first">'
//ESTA MAL EL MOCK DE getPreviousConten ? EN EL TEST SE DA LA ETIQUETA MISMA Y EL TEXTO ANTERIOR, PERO AQUI SOLO SE DA EL TEXTO ANTERIOR SIN LA 


jest.spyOn(window, 'getSelection').mockImplementation(() => ({
    getRangeAt: jest.fn(() => ({
        startContainer: {
            parentElement: {
                previousSibling: {}
            }
        }
    })),
} as unknown as Selection));

jest.mock("Utils/getPreviousContent/getPreviousContent")

it("should remove a specific highlight from a text", () => {
    const htmlParagraph = `This is a simple ${spanOpenHighlight}highlighted text</span> :D`
    const highlightToRemove = 'highlighted text'
    const newHtml = removeHighlight({highlightToRemove,htmlParagraph,spanOpenHighlight})

    const highlightRemoved = 'This is a simple highlighted text :D'

    expect(newHtml).toBe(highlightRemoved)
})

it("should remove a specific highlight from a text even if the highlight is repeated",()=>{

    const htmlParagraph = `A ${spanOpenHighlight}highlighted word</span>. The same ${spanOpenHighlight}highlighted word</span>`;

    const fullPreviousHtml = `'A ${spanOpenHighlight}highlighted word</span>. The same '`;
    const fullPreviousPlainText = 'A highlighted word. The same ';
    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({fullPreviousHtml, fullPreviousPlainText})

    const highlightToRemove = 'highlighted word';
    const newHtml = removeHighlight({highlightToRemove, htmlParagraph,  spanOpenHighlight})
    
    const highlightRemoved = `A ${spanOpenHighlight}highlighted word</span>. The same highlighted word`;

    

    expect(newHtml).toBe(highlightRemoved)

})

it("should remove a specific highlight from a text even if the selection is repeated and its in the highlight tag", ()=>{
    const highlightToRemove = 'context'
    const htmlParagraph = `The word "${spanOpenHighlight}context</span>" is inside the highlight tag. But we want to remove the second "${spanOpenHighlight}context</span>" word`;


    const fullPreviousHtml = `The word "${spanOpenHighlight}context</span>" is inside the highlight tag. But we want to remove the second "`;
    const fullPreviousPlainText = 'The word "context" is inside the highlight tag. But we want to remove the second "';
    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({fullPreviousHtml, fullPreviousPlainText})


    const newHtml = removeHighlight({highlightToRemove,htmlParagraph,spanOpenHighlight})

    const highlightRemoved = `The word "${spanOpenHighlight}context</span>" is inside the highlight tag. But we want to remove the second "context" word`

    expect(newHtml).toBe(highlightRemoved)

})

it("should return nothing if no text with highlighting is selected", () => {
    const htmlParagraph = "text should be the same"
    const highlightToRemove = "text should be the same"

    const returnedValue = removeHighlight({ highlightToRemove, htmlParagraph, spanOpenHighlight })

    expect(returnedValue).toBeUndefined()

})