/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, waitFor } from '__tests__/utils';
import LoginForm from 'components/login/form';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
describe('testing login form', () => {
  const submitFn = jest.fn();

  test('Test submission failure.', async () => {
    render(<LoginForm onSubmit={submitFn} isLoading={false} />);
    act(() => {
      userEvent.click(screen.queryByRole('button')!);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);

    expect(submitFn).not.toHaveBeenCalled();
  });
  test('Test validation associated with email inputs.', async () => {
    render(<LoginForm onSubmit={submitFn} isLoading={false} />);

    userEvent.type(screen.queryByLabelText(/email/i)!, 'test');
    userEvent.type(screen.queryByLabelText(/password/i)!, '123456');
    act(() => {
      userEvent.click(screen.queryByRole('button')!);
    });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Incorrect email'
    );
  });
  test('Test validation associated with password inputs.', async () => {
    render(<LoginForm onSubmit={submitFn} isLoading={false} />);

    userEvent.type(screen.queryByLabelText(/email/i)!, 'test@gmail.com');
    userEvent.type(screen.queryByLabelText(/password/i)!, 't');
    act(() => {
      userEvent.click(screen.queryByRole('button')!);
    });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'min password should be 6 symbols'
    );
  });
  test('Test successful submission.', () => {
    render(<LoginForm onSubmit={submitFn} isLoading={false} />);

    userEvent.type(screen.queryByLabelText(/email/i)!, 'test@gmail.com');
    userEvent.type(screen.queryByLabelText(/password/i)!, '123456');
    act(() => {
      userEvent.click(screen.queryByRole('button')!);
    });

    waitFor(() => {
      expect(submitFn).toHaveBeenCalled();
      expect(submitFn).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: '123456',
      });
    });
  });
});
