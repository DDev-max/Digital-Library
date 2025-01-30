import { extendHighlightStart } from "./extendHighlightStart"

const matchedOpeningSpan = {
    0: 'the <span class="contextMenu_color--first">user',
    index: 62,
    input: 'The first property of "matchedOpeningSpan" its supposed to be the <span class="contextMenu_color--first">user selection</span> inside the html'

} as RegExpExecArray


it("should extend the end of the highlight of a selection of the same color", () => {
    const spanOpenTag = '<span class="contextMenu_color--first">'
    const returnedHtml = extendHighlightStart({ matchedOpeningSpan, spanOpenTag })

    const extendedHighlight = 'The first property of "matchedOpeningSpan" its supposed to be <span class="contextMenu_color--first">the user selection</span> inside the html'

    expect(returnedHtml).toBe(extendedHighlight)

})

it("should extend the end of the highlight of a selection of a different color", () => {
    const spanOpenTag = '<span class="contextMenu_color--second">'
    const returnedHtml = extendHighlightStart({ matchedOpeningSpan, spanOpenTag })

    const extendedHighlight = 'The first property of "matchedOpeningSpan" its supposed to be <span class="contextMenu_color--second">the user</span><span class="contextMenu_color--first"> selection</span> inside the html'

    expect(returnedHtml).toBe(extendedHighlight)
})