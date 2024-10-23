export const hideContextMenu = (e: MouseEvent)=>{
    const eTarget = e.target as HTMLElement
                
    // para pasignarle la misma funcion a ambos eventos (ver los eventos añadidos)
    if (e.type === "scroll") return {display: "none"}

    if (typeof eTarget.className === "string" && !eTarget.className.includes("contextMenu")) {
        return {display: "none"}
    }

    return{}
}