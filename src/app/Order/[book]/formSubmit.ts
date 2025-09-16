import { sendEmail } from 'app/actions/sendEmail'
import type { AlertState } from 'data/types'
import { newAlert } from 'Utils/newAlert'

interface FormSubmitProps extends Pick<AlertState, 'setFormAlert'> {
  e: React.FormEvent<HTMLFormElement>
}

export interface FormFields {
  coordinates: string
  name: string
  book: string
  email: string
}

export async function formSubmit({ e, setFormAlert }: FormSubmitProps) {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const userInfo = Object.fromEntries(formData) as unknown as FormFields

  const { book, coordinates, email, name } = userInfo

  if (!coordinates || !coordinates.trim()) {
    newAlert({ setFormAlert, string: 'Please select your location on the map.', color: 'red' })
  } else {
    // The other fields were validated natively in HTML
    const emailRes = await sendEmail({ book, email, name })

    if (emailRes?.success) {
      newAlert({ setFormAlert, string: 'Form submitted!', color: 'green' })
    } else {
      newAlert({ setFormAlert, string: 'Error sending email', color: 'red' })
    }
  }
}
