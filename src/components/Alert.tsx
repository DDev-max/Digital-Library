"use client"

interface AlertProps {
    brdrColor?: boolean
    alert: string
}


//VER a11y
export function Alert({ brdrColor, alert }: AlertProps) {


    // brdrColor no se usa¿

    return (
        alert &&
        <dialog role="alert" aria-live="assertive" open className={`alert${brdrColor ? "--green" : ""}`}>
            <p> {alert} </p>
        </dialog>
    )
}


