import type { AlertState } from '../../data/types'
import { newAlert } from '../newAlert'

export function copyTxt({ setFormAlert }: Pick<AlertState, 'setFormAlert'>) {
  const selection = window.getSelection()?.toString()

  if (!selection) return

  navigator.clipboard.writeText(selection).then(() => {
    newAlert({ setFormAlert, string: 'Text Copied', color: 'green' })
  })
}
