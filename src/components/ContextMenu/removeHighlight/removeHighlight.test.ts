import { getPreviousContent } from "Utils/getPreviousContent/getPreviousContent";
import { removeHighlight } from "./removeHighlight"

//AÑADIR PARA CARACTERES FEOS DE LAS REGEX COMO : '?'

const bookContent = [
    'This <span class="contextMenu_color--first">text</span> has some <span class="contextMenu_color--first">highlighted text</span> but not everything should be removed. Also, some words are repeated, but <span class="contextMenu_color--first">text</span> should be the same'
]
const spanOpenHighlight = '<span class="contextMenu_color--first">'

const paragraphIdx = 0


const mockPreviousPlainText = 'This text has some highlighted text but not everything should be removed. Also, some words are repeated, but '
const mockPreviousHtml = 'This <span class="contextMenu_color--first">text</span> has some <span class="contextMenu_color--first">highlighted text</span> but not everything should be removed. Also, some words are repeated, but '

jest.mock("Utils/getPreviousContent/getPreviousContent");
(getPreviousContent as jest.Mock).mockReturnValue({fullPreviousHtml:mockPreviousHtml,fullPreviousPlainText:mockPreviousPlainText})


const mockRange = {
    startContainer: {},
    startOffset: 0,
    endOffset: 0,
    commonAncestorContainer: {
        parentElement: {
            previousSibling: {}
        }
    }
};

const mockSelection = {
    getRangeAt: jest.fn(() => mockRange),
};


global.window.getSelection = jest.fn(() => mockSelection) as jest.Mock;



//USAR SPYYYY

it("should remove a specific highlight from a text", () => {
    const highlightToRemove = "highlighted text"

    const returnedValue = removeHighlight({ bookContent, highlightToRemove, paragraphIdx, spanOpenHighlight })

    const highlightRemoved =    'This <span class="contextMenu_color--first">text</span> has some highlighted text but not everything should be removed. Also, some words are repeated, but <span class="contextMenu_color--first">text</span> should be the same'

    expect(returnedValue).toBe(highlightRemoved)
})


it("should remove a specific highlight from a text even if the highlight is repeated",()=>{
    const highlightToRemove = 'text'
    const returnedValue = removeHighlight({bookContent,highlightToRemove,paragraphIdx,spanOpenHighlight})

    const lastHighlightRemoved ='This <span class="contextMenu_color--first">text</span> has some <span class="contextMenu_color--first">highlighted text</span> but not everything should be removed. Also, some words are repeated, but text should be the same'



    expect(returnedValue).toBe(lastHighlightRemoved)
})

it("should return nothing if no text with highlighting is selected", () => {
    const highlightToRemove = "text should be the same"

    const returnedValue = removeHighlight({ bookContent, highlightToRemove, paragraphIdx, spanOpenHighlight })

    expect(returnedValue).toBeUndefined()

})