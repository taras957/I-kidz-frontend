import { render, screen, waitFor } from '__tests__/utils';

import NewCourseForm from '@/components/admin-page/courses/new-course-form';
import * as categoryOptions from 'domain/course-category/data-mappers/use-category-translation';
import '__tests__/utils/mock-create-object-url';
import { createCourse } from 'domain/course/data';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

jest.mock('api/course/data');
jest
  .spyOn(categoryOptions, 'useCategoryTranslation')
  .mockImplementation(() => [{ label: '23', value: '23' }]);

jest.mock('api/course-category/data-mappers/use-category-translation');
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
test('should display 7 errors for invalid data submission, submit function not called', () => {
  userEvent.click(screen.getByRole('button'));

  waitFor(() => {
    expect(screen.getAllByRole('alert')).toHaveLength(7);
    expect(createCourse).not.toHaveBeenCalled();
  });
});

test('should display success toaster on valid data submit and form resets', async () => {
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  const titleInput = screen.getByLabelText(/назва курсу/i);
  const subTitleInput = screen.getByLabelText(/підзаголовок/i);
  const priceInput = screen.getByLabelText(/ціна/i);
  const ageSelect = screen.getByLabelText(/вікова група/i);
  const durationInput = screen.getByLabelText(/тривалість/i);
  const descriptionInput = screen.getByLabelText(/опис/i);
  const fileInput = screen.getByLabelText(/логотип/i);

  userEvent.type(titleInput, 'test title');
  userEvent.type(subTitleInput, 'test subtitle');
  userEvent.type(priceInput, 'test price is 300 dollars');
  userEvent.type(durationInput, '2 hours');
  userEvent.type(descriptionInput, 'my test description');
  await selectEvent.select(ageSelect, '23');
  userEvent.upload(fileInput, file);

  // Press submit button
  userEvent.click(screen.getByRole('button'));

  waitFor(() => {
    expect(createCourse).toHaveBeenCalled();
  });
});
