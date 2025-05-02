import type { AlertState } from 'data/types'

interface NewAlertProps extends Pick<AlertState, 'setFormAlert'> {
  string: string
  color: 'red' | 'green'
}

export function newAlert({ setFormAlert, string, color }: NewAlertProps) {
  setFormAlert({ string, color })

  setTimeout(() => {
    setFormAlert({ string: '', color })
  }, 2000)

  return
}
