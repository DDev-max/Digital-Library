import type { UserEvent } from '@testing-library/user-event'
import { fireEvent, screen } from '@testing-library/react'

interface FillRequiredInputsParams {
  user: UserEvent
  coordinates?: string
}

export async function fillRequiredInputs({ coordinates, user }: FillRequiredInputsParams) {
  const inputName = screen.getByLabelText(/name/i)
  await user.type(inputName, 'Jose jose')

  const inputPhone = screen.getByLabelText(/phone/i)
  await user.type(inputPhone, '12345678')

  const inputEmail = screen.getByLabelText(/Email/i)
  await user.type(inputEmail, 'example@gmail.com')

  const hiddenCoordinatesInput = screen.getByTestId('marker-input')
  fireEvent.change(hiddenCoordinatesInput, { target: { value: coordinates ? coordinates : '123,456' } })
}
