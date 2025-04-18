import type { AlertState } from 'data/types'
import { newAlert } from 'Utils/newAlert'

interface FormSubmitProps extends Pick<AlertState, 'setFormAlert'> {
  e: React.FormEvent<HTMLFormElement>
}

export function formSubmit({ e, setFormAlert }: FormSubmitProps) {
  e.preventDefault()

  const userInfo = Object.fromEntries(new window.FormData(e.target as HTMLFormElement))

  if (userInfo.coordinates) {
    // Other fields have already been validated
    newAlert({ setFormAlert, string: 'Form submitted!', color: 'green' })
  } else {
    newAlert({ setFormAlert, string: 'Please select your location on the map.', color: 'red' })
  }
}
