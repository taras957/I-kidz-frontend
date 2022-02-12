/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import '__tests__/utils/media';
import Form from '@/components/home/test-lesson-modal/form';
import { render, act, screen, waitFor } from '__tests__/utils/index';

import * as ModalDialog from '@/components/common/modal/index';

import * as TestLessonFormHook from 'hooks/useTestLessonForm';

import uaLocate from 'locate/ua/translate.json';
import userEvent from '@testing-library/user-event';

jest.spyOn(ModalDialog, 'useModal').mockImplementation(() => ({
  isOpen: true,
  open: () => {},
  close: () => {},
}));

const mockPostFn = jest.fn();

jest.spyOn(TestLessonFormHook, 'useTestLessonForm').mockImplementation(() => ({
  isLoading: false,
  post: mockPostFn,
  isSuccess: true,
}));

afterAll(() => {
  jest.restoreAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});
describe('testing form component', () => {
  async function formSetUp() {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <Form isLoading={false} onSubmit={mockPostFn} isSuccess={false} />
      );
    });

    const form = screen.queryByRole('form');

    const submitBtn: HTMLButtonElement = screen.queryByRole('button')!;
    const inputName: HTMLInputElement = screen.queryByLabelText(
      uaLocate.translations['test-lesson-form'].name
    )!;
    const inputPhone: HTMLInputElement = screen.queryByLabelText(
      uaLocate.translations['test-lesson-form'].phone
    )!;
    const inputEmail: HTMLInputElement = screen.queryByLabelText(/email/i)!;
    return {
      form,
      submitBtn,
      inputName,
      inputPhone,
      inputEmail,
      renderResult,
    };
  }

  test('create new lessons form appears & submits', async () => {
    const mock = {
      name: 'Test Ivan',
      phone: '+38(038)-09-99-999',
      email: 'testEmail@gmail.com',
    };
    const { form, submitBtn, inputName, inputPhone, inputEmail, renderResult } =
      await formSetUp();

    expect(form).toBeInTheDocument();

    userEvent.type(inputName, mock.name);
    userEvent.type(inputPhone, mock.phone);
    userEvent.type(inputEmail, mock.email);

    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockPostFn).toHaveBeenCalled();
      expect(mockPostFn).toHaveBeenCalledTimes(1);
    });
    renderResult.rerender(
      <Form isLoading={false} onSubmit={mockPostFn} isSuccess={true} />
    );

    expect(screen.queryByTestId(/success/i)).toBeInTheDocument();

    expect(inputName).toHaveValue('');
    expect(inputPhone).toHaveValue('');
    expect(inputEmail).toHaveValue('');
  });

  test('should show errors, when inputs are incorrect', async () => {
    const { submitBtn } = await formSetUp();

    userEvent.click(submitBtn);

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockPostFn).not.toBeCalled();
  });

  test('should be focus when press on input label', async () => {
    const { inputName, inputPhone, inputEmail } = await formSetUp();
    const labelName = screen.queryByText(
      uaLocate.translations['test-lesson-form'].name
    );
    const labelPhone = screen.queryByText(
      uaLocate.translations['test-lesson-form'].phone
    );
    const labelEmail = screen.queryByText(/email/i);

    userEvent.click(labelName);
    expect(inputName).toHaveFocus();
    userEvent.click(labelPhone);
    expect(inputPhone).toHaveFocus();

    userEvent.click(labelEmail);
    expect(inputEmail).toHaveFocus();
  });
});
