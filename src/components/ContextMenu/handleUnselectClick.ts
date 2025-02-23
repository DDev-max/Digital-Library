import type { CSSProperties, Dispatch, RefObject, SetStateAction } from 'react'
import { getParagraphIdx } from './getParagraphIdx'
import { removeHighlight } from './removeHighlight/removeHighlight'
import type { BookContentState } from 'data/types'

interface HandleUnselectClickProps extends BookContentState {
  paragraphContainer: RefObject<HTMLDivElement>
  setPosition: Dispatch<SetStateAction<CSSProperties | undefined>>
}

export function handleUnselectClick({ paragraphContainer, bookContent, setBookContent, setPosition }: HandleUnselectClickProps) {
  const range = window.getSelection()?.getRangeAt(0)
  const highlightToRemove = range?.startContainer.nextSibling?.textContent ?? range?.startContainer.textContent

  const classToSearch = range?.startContainer?.parentElement?.className || (range?.startContainer?.nextSibling as HTMLElement)?.className || ''

  if (!highlightToRemove || !classToSearch) return

  const spanOpenHighlight = `<span class="${classToSearch}">`

  const paragraphIdx = getParagraphIdx(paragraphContainer)
  const noHighlight = removeHighlight({ htmlParagraph: bookContent[paragraphIdx], highlightToRemove, spanOpenHighlight })
  setPosition({ display: 'none' })

  const copy = [...bookContent]

  if (!noHighlight) return
  copy[paragraphIdx] = noHighlight

  setBookContent(copy)

  return
}
