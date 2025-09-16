import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { sendEmail } from 'app/actions/sendEmail';
import OrderPage from './page';
import { fillRequiredInputs } from 'Utils/testUtils/fillRequiredInputs';

jest.mock('next/navigation', () => ({
  useParams: () => ({ book: 'A book' }),
}));

jest.mock('../../../components/Map/DynamicMap');
jest.mock('../../actions/sendEmail');

it('should display an alert when the form is successfully submitted', async () => {
  const user = userEvent.setup();

  render(<OrderPage />);

  await fillRequiredInputs({ user });

  (sendEmail as jest.MockedFunction<typeof sendEmail>).mockResolvedValue({ success: true });

  const submitBtn = screen.getByRole('button', { name: /Send Form/i });
  await user.click(submitBtn);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(/Form submitted/i);
});

it('should display an alert when there are no coordinates', async () => {
  const user = userEvent.setup();

  render(<OrderPage />);

  await fillRequiredInputs({ user, coordinates: ' ' });

  (sendEmail as jest.MockedFunction<typeof sendEmail>).mockResolvedValue({ success: true });

  const submitBtn = screen.getByRole('button', { name: /Send Form/i });
  await user.click(submitBtn);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(/Select Your Location/i);
});

it('should display an alert when the email is not sent', async () => {
  const user = userEvent.setup();

  render(<OrderPage />);

  await fillRequiredInputs({ user });

  (sendEmail as jest.MockedFunction<typeof sendEmail>).mockResolvedValue({ success: false });

  const submitBtn = screen.getByRole('button', { name: /Send Form/i });
  await user.click(submitBtn);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(/Error sending email/i);
});
