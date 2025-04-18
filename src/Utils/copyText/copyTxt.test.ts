import { newAlert } from 'Utils/newAlert';
import { copyTxt } from './copyTxt';
import { waitFor } from '@testing-library/react';

const setFormAlert = jest.fn();
jest.mock('Utils/newAlert');

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

it("should call 'newAlert' if theres selected text", async () => {
  jest.spyOn(window, 'getSelection').mockImplementation(
    () =>
      ({
        toString: () => 'Selected text',
      }) as Selection
  );

  copyTxt({ setFormAlert });

  await waitFor(() => {
    expect(newAlert).toHaveBeenCalled();
  });
});

it("shouldnt call 'newAlert' if theres no selected text", async () => {
  jest.spyOn(window, 'getSelection').mockImplementation(
    () =>
      ({
        toString: () => '',
      }) as Selection
  );

  copyTxt({ setFormAlert });

  await waitFor(() => {
    expect(newAlert).not.toHaveBeenCalled();
  });
});
