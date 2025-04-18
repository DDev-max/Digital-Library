'use client'

interface AlertProps {
  brdrColor: 'red' | 'green'
  alert: string
}

export function Alert({ brdrColor, alert }: AlertProps) {
  return (
    alert && (
      <dialog role='alert' aria-live='assertive' open className={`alert ${brdrColor === 'green' ? 'alert--green' : ''}`}>
        <p> {alert} </p>
      </dialog>
    )
  )
}
