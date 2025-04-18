import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('render alert', () => {
  it('should render an alert', () => {
    const alertMsg = 'This is an alert message';

    render(<Alert brdrColor='green' alert={alertMsg} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(alertMsg);
  });

  it('shouldnt render an alert if theres no alert', () => {
    render(<Alert brdrColor='red' alert='' />);

    const alert = screen.queryByRole('alert');
    expect(alert).toBeNull();
  });
});

describe('alert color', () => {
  it("should have the class name 'alert--green' if the 'brdrColor' property is green.", () => {
    render(<Alert alert='This is a green alert' brdrColor='green' />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('alert--green');
  });

  it("shouldnt have the class name 'alert--green' if the 'brdrColor' property is red.", () => {
    render(<Alert brdrColor='red' alert='This is a red alert' />);

    const alert = screen.getByRole('alert');
    expect(alert).not.toHaveClass('alert--green');
  });
});
