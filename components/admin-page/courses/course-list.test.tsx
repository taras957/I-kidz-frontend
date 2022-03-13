/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, waitFor } from '__tests__/utils';
import CoursesList from 'components/admin-page/courses';
import userEvent from '@testing-library/user-event';

import { deleteCourse, updateCourse } from 'domain/course/data';

jest.mock('api/course/data');

afterAll(() => {
  jest.restoreAllMocks();
});
const mockData = [
  {
    category: 'junior',
    isActive: true,
    path: '..img',
    title: 'test data',
    subtitle: 'test subtitle',
    description: 'test description',
    price: '100',
    duration: '1 hour',
    id: '123',
  },
];

beforeEach(() => {
  render(<CoursesList courses={mockData} />);
});
test('should render table with data', () => {
  expect(screen.queryByRole('table')).toBeInTheDocument();
  expect(screen.queryAllByRole('row')).toHaveLength(2);
});

test('edit link should have correct href', () => {
  const editLink = screen.queryByRole('link')!;
  expect(editLink).toHaveAttribute(
    'href',
    `/courses/edit-course/${mockData[0].id}`
  );
});

test('delete btn should should be called with right params', () => {
  const deleteBtn = screen.queryByText(/delete/i)!;
  userEvent.click(deleteBtn);

  waitFor(() => {
    expect(deleteCourse).toHaveBeenCalled();
    expect(deleteCourse).toHaveBeenCalledTimes(1);
    expect(deleteCourse).toHaveBeenCalledWith(mockData[0].id);
  });
});

test('toggle btn should should be called with right params', () => {
  const toggle = screen.queryByRole('checkbox')!;

  userEvent.click(toggle);

  waitFor(() => {
    expect(updateCourse).toHaveBeenCalled();
    expect(updateCourse).toHaveBeenCalledTimes(1);
    expect(updateCourse).toHaveBeenCalledWith({
      id: mockData[0].id,
      is_active: !mockData[0].isActive,
    });
  });
});
