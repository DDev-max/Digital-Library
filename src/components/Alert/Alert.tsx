'use client'

interface AlertProps {
  brdrColor?: boolean
  alert: string
}

export function Alert({ brdrColor, alert }: AlertProps) {
  return (
    alert && (
      <dialog role='alert' aria-live='assertive' open className={`alert ${brdrColor ? 'alert--green' : ''}`}>
        <p> {alert} </p>
      </dialog>
    )
  )
}
