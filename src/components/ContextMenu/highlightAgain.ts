import { emptySpanRegex, regexSpecialCharacters, spanCloseRegex, spanOpenRegex } from 'data/consts'
import { extendHighlightStart } from './extendHighlightStart/extendHighlightStart'
import { extendHighlightEnd } from './extendHighlightEnd/extendHighlightEnd'
import { removeHighlight } from './removeHighlight/removeHighlight'
import { highlightPlainText } from './highlightPlainText/highlightPlainText'
import type { CSSProperties, Dispatch, RefObject, SetStateAction } from 'react'
import type { BookContentState } from 'data/types'
import { getParagraphIdx } from './getParagraphIdx'

interface HighlightAgainProps extends Pick<BookContentState, 'bookContent'> {
  selectedParagraphHtml: string
  spanOpenTag: string
  paragraphContainer: RefObject<HTMLDivElement>
  setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>
}

export function highlightAgain({ selectedParagraphHtml, spanOpenTag, bookContent, paragraphContainer, setPosition }: HighlightAgainProps) {
  const userSelection = window.getSelection()?.toString()
  if (!userSelection) return

  let bothTags = true
  for (let i = 0; i <= userSelection.length; i++) {
    const selectionFirstPart = userSelection.slice(0, i)
    const selectionLastPart = userSelection.slice(i)

    const escapedFirstPart = selectionFirstPart.replace(regexSpecialCharacters, '\\$&')
    const escapedLastPart = selectionLastPart.replace(regexSpecialCharacters, '\\$&')

    const textSpanOpenRegex = new RegExp(`${escapedFirstPart}${spanOpenRegex.source}${escapedLastPart}`)
    const textSpanCloseRegex = new RegExp(`${escapedFirstPart}${spanCloseRegex.source}${escapedLastPart}`)

    const matchedOpeningSpan = textSpanOpenRegex.exec(selectedParagraphHtml)
    const matchedClosingSpan = textSpanCloseRegex.exec(selectedParagraphHtml)

    if (matchedOpeningSpan || matchedClosingSpan) {
      const extendedHighlighting = matchedOpeningSpan
        ? extendHighlightStart({ matchedOpeningSpan, spanOpenTag })
        : extendHighlightEnd({ matchedClosingSpan, spanOpenTag })

      if (!extendedHighlighting || extendedHighlighting.match(emptySpanRegex)) return

      bothTags = false
      return extendedHighlighting
    }
  }

  if (bothTags) {
    const range = window.getSelection()?.getRangeAt(0)
    const highlightToRemove = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent
    if (!highlightToRemove) return

    const classToSearch = range?.startContainer.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement).className

    const spanOpenHighlight = `<span class="${classToSearch}">`

    const htmlParagraph = bookContent[getParagraphIdx(paragraphContainer)]

    const paragraphNoHighlight = removeHighlight({ htmlParagraph, highlightToRemove, spanOpenHighlight })
    setPosition({ display: 'none' })

    if (!paragraphNoHighlight) return

    const newHighlighting = highlightPlainText({ spanOpenTag, htmlContent: paragraphNoHighlight })

    return newHighlighting
  }
}
