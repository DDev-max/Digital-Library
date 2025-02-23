import { regexSpecialCharacters, spanCloseTag, spanOpenRegex } from 'data/consts'
import { getPreviousContent } from 'Utils/getPreviousContent/getPreviousContent'

interface highlightPlainTextProps {
  htmlContent: string
  spanOpenTag: string
}

export function highlightPlainText({ htmlContent, spanOpenTag }: highlightPlainTextProps) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlContent

  const fullPlainTxt = tempDiv.textContent

  const originalSelection = window.getSelection()?.toString()

  const range = window.getSelection()?.getRangeAt(0)

  if (!originalSelection || !fullPlainTxt || !range) return

  //when the whole paragraph is selected by triple-clicking on it, some additional spaces are added in the selection
  const userSeleccion = originalSelection.slice(0, -2) === fullPlainTxt ? originalSelection.slice(0, -2) : originalSelection

  let rangeStart = range.startOffset

  const { fullPreviousPlainText, fullPreviousHtml } = getPreviousContent(range.startContainer.previousSibling)

  const escapedHighlight = new RegExp(`${userSeleccion.replace(regexSpecialCharacters, '\\$&')}`, 'g')

  if (fullPreviousPlainText) rangeStart += fullPreviousPlainText.length

  const matchNumPlainTxt = Array.from(fullPlainTxt.matchAll(escapedHighlight)).findIndex(elmnt => elmnt.index === rangeStart)

  let matchNumHtml = matchNumPlainTxt

  const matchSpanTagHtml = Array.from(fullPreviousHtml.matchAll(spanOpenRegex))

  matchSpanTagHtml.forEach(el => {
    if (el[0].match(escapedHighlight)) {
      matchNumHtml++
    }
  })

  const idxHtml = Array.from(htmlContent.matchAll(escapedHighlight))[matchNumHtml]?.index ?? -1

  if (idxHtml === -1) return

  const firstPart = htmlContent.slice(0, idxHtml)
  const highLightedSelection = spanOpenTag + userSeleccion + spanCloseTag
  const lastPart = htmlContent.slice(idxHtml + userSeleccion.length)

  const newHighlight = firstPart + highLightedSelection + lastPart

  return newHighlight
}
