import { getPreviousContent } from "Utils/getPreviousContent/getPreviousContent"
import { highlightPlainText } from "./highlightPlainText"

const spanOpenTag = '<span class="contextMenu_color--first">'

jest.mock("Utils/getPreviousContent/getPreviousContent");


it("should highlight a plain text", () => {
    jest.spyOn(window, 'getSelection').mockImplementation(() => ({
        toString: () => 'text with no highlight',
        getRangeAt: () => ({
            startOffset: 3,
            startContainer: {
                previousSibling: {}
            }
        })
    } as unknown as Selection));

    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({
        fullPreviousPlainText: 'This function should be called when the user selects',
        fullPreviousHtml: 'This function should be called when <span class="contextMenu_color--first">the user selects</span>'
    })

    const htmlContent = 'This function should be called when <span class="contextMenu_color--first">the user selects</span> a text with no highlight'
    const returnedHtml = highlightPlainText({ htmlContent, spanOpenTag })

    const highlightedText = 'This function should be called when <span class="contextMenu_color--first">the user selects</span> a <span class="contextMenu_color--first">text with no highlight</span>'
    expect(returnedHtml).toBe(highlightedText)
})

it("should highlight an entire plain text when it is selected by triple-clicking", () => {
    jest.spyOn(window, 'getSelection').mockImplementation(() => ({
        toString: () => 'This text was selected by triple clicking on it, because it has 2 aditional blank spaces at the end in the selection  ',
        getRangeAt: () => ({
            startOffset: 0,
            startContainer: {
                previousSibling: {}
            }
        })
    } as unknown as Selection));

    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({
        fullPreviousPlainText: '',
        fullPreviousHtml: ''
    })

    const htmlContent = 'This text was selected by triple clicking on it, because it has 2 aditional blank spaces at the end in the selection'
    const returnedHtml = highlightPlainText({ htmlContent, spanOpenTag })

    const highlightedText = '<span class="contextMenu_color--first">This text was selected by triple clicking on it, because it has 2 aditional blank spaces at the end in the selection</span>'
    expect(returnedHtml).toBe(highlightedText)

})

it("should highlight a specific word in plain text, even if the word is repeated", () => {
    jest.spyOn(window, 'getSelection').mockImplementation(() => ({
        toString: () => 'string',
        getRangeAt: () => ({
            startOffset: 34,
            startContainer: {
                previousSibling: {}
            }
        })
    } as unknown as Selection));


    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({
        fullPreviousPlainText: 'This string',
        fullPreviousHtml: 'This <span class="contextMenu_color--second">string</span>'
    });


    const htmlContent = 'This <span class="contextMenu_color--second">string</span> has some repeated words such as "string".'
    const returnedHtml = highlightPlainText({ htmlContent, spanOpenTag })

    const highlightedText = 'This <span class="contextMenu_color--second">string</span> has some repeated words such as "<span class="contextMenu_color--first">string</span>".'

    expect(returnedHtml).toBe(highlightedText)
})

it('should highlight a word even if it is included in the highlight tag', () => {
    jest.spyOn(window, 'getSelection').mockImplementation(() => ({
        toString: () => 'color',
        getRangeAt: () => ({
            startOffset: 39,
            startContainer: {
                previousSibling: {}
            }
        })
    } as unknown as Selection));

    const htmlContent = 'The <span class="contextMenu_color--first">highlight tag</span> contains some words, such as context, color, first, second...';

    (getPreviousContent as jest.MockedFunction<typeof getPreviousContent>).mockReturnValue({
        fullPreviousPlainText: 'The highlight tag',
        fullPreviousHtml: 'The <span class="contextMenu_color--first">highlight tag</span>'
    });

    const returnedHtml = highlightPlainText({ htmlContent, spanOpenTag })

    const highlightedText = 'The <span class="contextMenu_color--first">highlight tag</span> contains some words, such as context, <span class="contextMenu_color--first">color</span>, first, second...'

    expect(returnedHtml).toBe(highlightedText)
})