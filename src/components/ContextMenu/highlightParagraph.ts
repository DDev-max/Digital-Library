import { highlightPlainText } from './highlightPlainText/highlightPlainText'
import { newAlert } from '../../Utils/newAlert'
import type { AlertState, BookContentState } from 'data/types'
import type { CSSProperties, RefObject } from 'react'
import { getParagraphIdx } from './getParagraphIdx'
import { highlightAgain } from './highlightAgain'

interface HighlightParagraphProps extends BookContentState, Pick<AlertState, 'setFormAlert'> {
  e: React.MouseEvent<HTMLButtonElement>
  setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
  paragraphContainer: RefObject<HTMLDivElement>
}

export function highlightParagraph({ e, setFormAlert, bookContent, setPosition, paragraphContainer, setBookContent }: HighlightParagraphProps) {
  const eTarget = e.target as HTMLElement
  const wSelect = window.getSelection()
  if (!wSelect?.toString().trim()) return
  const spanOpenTag = `<span class="${eTarget.classList[1]}">`
  const paragraphIdx = getParagraphIdx(paragraphContainer)

  if (paragraphIdx < 0) {
    wSelect?.removeAllRanges()
    newAlert({ setFormAlert, color: 'red', string: 'Please select one paragraph at a time' })
    return
  }

  const selectedParagraphHtml = bookContent[paragraphIdx]

  const newHtml =
    highlightPlainText({ spanOpenTag, htmlContent: selectedParagraphHtml }) ||
    highlightAgain({ bookContent, paragraphContainer, selectedParagraphHtml, setPosition, spanOpenTag })

  const copy = [...bookContent]

  // when user tries to nest more than one highlighted text
  if (!newHtml) {
    newAlert({ setFormAlert, string: 'First try removing some highlighting from the selection.', color: 'red' })
    return
  }

  copy[paragraphIdx] = newHtml
  setBookContent(copy)
  setPosition({ display: 'none' })
  wSelect?.removeAllRanges()

  return
}
