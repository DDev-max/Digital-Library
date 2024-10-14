export interface RepeatedWordFnProps{
    content: string
    toSearch: string
    condition: number
}

export function getRepeatedWordNum({content,toSearch, condition}: RepeatedWordFnProps){

    let currentIdx = content.indexOf(toSearch)
    if (currentIdx === -1) return
    let nMatch = 1

    while (currentIdx !== condition) {
        currentIdx = content.indexOf(toSearch, currentIdx + 1)

        nMatch++
    }

    return nMatch
}