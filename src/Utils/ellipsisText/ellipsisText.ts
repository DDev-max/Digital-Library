
interface EllipsisTextProps {
    text: string
    maxLength: number
}


export function ellipsisText({ maxLength, text }: EllipsisTextProps) {

    const ellipsis = text.length > maxLength ? text.slice(0, maxLength) + "..." : text

    return ellipsis
}

