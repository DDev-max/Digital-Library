import { newAlert } from 'Utils/newAlert';
import { formSubmit } from './formSubmit';

jest.mock('Utils/newAlert');

const e = {
  preventDefault: jest.fn(),
} as unknown as React.FormEvent<HTMLFormElement>;

const setFormAlert = jest.fn();

it('should call newAlert', () => {
  formSubmit({ e, setFormAlert });

  expect(newAlert).toHaveBeenCalledTimes(1);
});
