export function ellipsisText(text: string){
    const maxLength = 23
    const ellipsis= text.length > maxLength ? text.slice(0, maxLength) + "..." : text

    return ellipsis
}