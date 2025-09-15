import type { UserEvent } from '@testing-library/user-event'
import { screen } from '@testing-library/react'

export async function fillRequiredInputs(user: UserEvent) {
  const inputName = screen.getByLabelText(/name/i)
  await user.type(inputName, 'Jose jose')

  const inputPhone = screen.getByLabelText(/phone/i)
  await user.type(inputPhone, '12345678')

  const inputEmail = screen.getByLabelText(/Email/i)
  await user.type(inputEmail, 'example@gmail.com')
}
