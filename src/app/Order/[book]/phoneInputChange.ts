interface PhoneInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>
  phoneRef: React.RefObject<HTMLInputElement>
}

export function phoneInputChange({ e, phoneRef }: PhoneInputChangeProps) {
  const currentInput = e.target.value

  const filteredInput = currentInput.replace(/\D/g, '')

  e.target.setCustomValidity('')

  const formattedInput = filteredInput.length > 4 ? `${filteredInput.slice(0, 4)}-${filteredInput.slice(4)}` : filteredInput

  if (isNaN(Number(currentInput[currentInput.length - 1])) && currentInput[currentInput.length - 1] !== '-') {
    e.target.setCustomValidity('Please use only numbers')
  } else if (formattedInput.length !== 9) {
    e.target.setCustomValidity('Please enter a eight-digit telephone number')
  }

  phoneRef.current!.value = formattedInput

  e.target.reportValidity()
}
