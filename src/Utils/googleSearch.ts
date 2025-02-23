export function googleSearch() {
  const selection = window.getSelection()?.toString()

  const url = `https://www.google.com/search?q=${selection}`
  window.open(url)
}
