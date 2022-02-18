import { render, screen, waitFor } from '__tests__/utils';

import NewCourseForm from '@/components/admin-page/courses/new-course-form';

// import { createCourse, ICreateCourse } from 'api/course/data';
import userEvent from '@testing-library/user-event';

jest.mock('api/course/data');

afterAll(() => {
  jest.restoreAllMocks();
});
beforeEach(() => {
  render(<NewCourseForm />);
});

test('should render form with all 6 form controls', () => {
  expect(screen.queryByRole('form')).toBeInTheDocument();

  expect(screen.getByLabelText(/назва курсу/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/підзаголовок/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/ціна/i)).toBeInTheDocument();
  expect(screen.getByText(/вікова група/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/тривалість/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/опис/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/логотип/i)).toBeInTheDocument();
});
test('should display 6www errors for invalid data submission, submit function not called', () => {
  userEvent.click(screen.getByRole('button'));

  waitFor(() => {
    expect(screen.getAllByRole('alert')).toHaveLength(7);
  });
});

test.todo(
  'should display success message on valid data submit and form resets'
);
