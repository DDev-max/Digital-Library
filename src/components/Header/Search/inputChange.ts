import type { UserSearchState } from 'data/types'

interface InputChangeProps extends Pick<UserSearchState, 'setUserSearch'> {
  event: React.ChangeEvent<HTMLInputElement>
}

export function inputChange({ event, setUserSearch }: InputChangeProps) {
  const userInput = event.target.value

  setUserSearch(userInput)
}
