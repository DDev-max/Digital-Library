import type { AlertState } from 'data/types'

interface NewAlertProps extends Pick<AlertState, 'setAlert'> {
  string: string
}

export function newAlert({ setAlert, string }: NewAlertProps) {
  setAlert(string)

  setTimeout(() => {
    setAlert('')
  }, 2000)

  return
}
