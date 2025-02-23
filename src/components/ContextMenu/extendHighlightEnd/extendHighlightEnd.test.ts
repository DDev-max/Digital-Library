import { extendHighlightEnd } from './extendHighlightEnd';

const matchedClosingSpan = {
  0: 'selection</span> inside',
  index: 110,
  input:
    'The first property of "matchedClosingSpan" its supposed to be the <span class="contextMenu_color--first">user selection</span> inside the html',
} as RegExpExecArray;

it('should extend the end of the highlight of a selection of the same color', () => {
  const spanOpenTag = '<span class="contextMenu_color--first">';
  const returnedHtml = extendHighlightEnd({ matchedClosingSpan, spanOpenTag });

  const extendedHighlight = `The first property of "matchedClosingSpan" its supposed to be the ${spanOpenTag}user selection inside</span> the html`;

  expect(returnedHtml).toBe(extendedHighlight);
});

it('should extend the end of the highlight of a selection of a different color', () => {
  const spanOpenTag = '<span class="contextMenu_color--second">';
  const returnedHtml = extendHighlightEnd({ matchedClosingSpan, spanOpenTag });

  const extendedHighlight = `The first property of "matchedClosingSpan" its supposed to be the <span class="contextMenu_color--first">user </span>${spanOpenTag}selection inside</span> the html`;

  expect(returnedHtml).toBe(extendedHighlight);
});

it('shouldnt return if theres no matchedClosingSpan', () => {
  const matchedClosingSpan = null;
  const spanOpenTag = '<span class="contextMenu_color--first">';
  const returnedHtml = extendHighlightEnd({ matchedClosingSpan, spanOpenTag });

  expect(returnedHtml).toBeUndefined();
});
