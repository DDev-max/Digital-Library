export function googleSearch(){
    const seleccion = window.getSelection()?.toString()
        
    const url = `https://www.google.com/search?q=${seleccion}`
    window.open(url)

}