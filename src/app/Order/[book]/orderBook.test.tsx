import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import OrderPage from './page';

jest.mock('next/navigation', () => ({
  useParams: () => ({ book: 'A book' }),
}));

jest.mock('../../../components/Map/DynamicMap');

it('should display an alert if the form has been submitted', async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<OrderPage />);

  const inputName = screen.getByLabelText(/name/i);
  await user.type(inputName, 'Jose jose');

  const inputPhone = screen.getByLabelText(/phone/i);
  await user.type(inputPhone, '12345678');

  const inputEmail = screen.getByLabelText(/Email/i);
  await user.type(inputEmail, 'poveda.contacto@gmail.com');

  const submitBtn = screen.getByRole('button', { name: /Send Form/i });
  await user.click(submitBtn);

  const alert = screen.getByRole('alert');
  expect(alert).toBeInTheDocument();

  await act(async () => {
    jest.advanceTimersByTime(2100);
    jest.runOnlyPendingTimers();
  });

  await waitFor(() => {
    expect(alert).not.toBeInTheDocument();
  });

  jest.useRealTimers();
});
