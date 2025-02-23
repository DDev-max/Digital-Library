import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('render alert', () => {
  it('should render an alert', () => {
    const alertMsg = 'This is an alert message';

    render(<Alert alert={alertMsg} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(alertMsg);
  });

  it('shouldnt render an alert if theres no alert', () => {
    render(<Alert alert='' />);

    const alert = screen.queryByRole('alert');
    expect(alert).toBeNull();
  });
});

describe('alert color', () => {
  it("should have class name 'alert--green' if brdrColor prop is given", () => {
    render(<Alert alert='This is a green alert' brdrColor />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('alert--green');
  });

  it("shouldnt have class name 'alert--green' if brdrColor prop is not given", () => {
    render(<Alert alert='This is a red alert' />);

    const alert = screen.getByRole('alert');
    expect(alert).not.toHaveClass('alert--green');
  });
});
