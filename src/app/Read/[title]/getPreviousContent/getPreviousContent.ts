export function getPreviousContent(from: Node | null) {
  let fullPreviousPlainText = ''
  let fullPreviousHtml = ''
  let previousElmnt = from

  while (previousElmnt) {
    fullPreviousPlainText = previousElmnt.textContent + fullPreviousPlainText

    fullPreviousHtml = (previousElmnt instanceof HTMLElement ? previousElmnt.outerHTML : previousElmnt.textContent || '') + fullPreviousHtml
    previousElmnt = previousElmnt.previousSibling
  }

  return { fullPreviousPlainText, fullPreviousHtml }
}
