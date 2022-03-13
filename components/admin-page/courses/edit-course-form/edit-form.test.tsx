// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//  @ts-ignore
import { render, screen, waitFor } from '__tests__/utils';
import EditCourseForm from '.';
import * as apiCourseData from 'domain/course/data';
import * as mockUser from 'context/auth-provider';
import * as categoryOptions from 'domain/course-category/data-mappers/use-category-translation';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import '__tests__/utils/mock-create-object-url';

let courseInfo = {};
const mockCourseData = {
  translations: {
    ['ua']: {
      title: 'test title',
      subtitle: 'test subtitle',
      price: '100',
      duration: '2 hours',
      description: ' test test',
    },
  },

  category: 'children',
  path: './image.jpeg',
  isActive: true,
  id: 'test id',
  token: 'dasdadas',
};
function initForm() {
  render(<EditCourseForm />);
  const titleInput = screen.getByLabelText(/назва курсу/i);
  const subTitleInput = screen.getByLabelText(/підзаголовок/i);
  const priceInput = screen.getByLabelText(/ціна/i);
  const ageSelect = screen.getByText(mockCourseData.category);
  const durationInput = screen.getByLabelText(/тривалість/i);
  const descriptionInput = screen.getByLabelText(/опис/i);
  const imgPreview = screen.getByAltText(/logo/i);
  const fileInput = screen.getByLabelText(/логотип/i);

  courseInfo = {
    titleInput,
    subTitleInput,
    priceInput,
    ageSelect,
    durationInput,
    descriptionInput,
    imgPreview,
    fileInput,
  };
}
beforeEach(() => {
  initForm();
});

beforeAll(() => {
  process.env.NEXT_PUBLIC_API = 'development';
  jest.mock('api/course/data');
});
jest.spyOn(categoryOptions, 'useCategoryTranslation').mockImplementation(() => [
  { label: 'children', value: 'children' },
  { label: 'children 12', value: 'children 12' },
]);

jest
  .spyOn(apiCourseData, 'useSingleCourse')
  .mockImplementation(() => ({ data: mockCourseData }));
jest
  .spyOn(mockUser, 'useUser')
  .mockImplementation(() => ({ token: 'test token' }));
afterAll(() => {
  jest.restoreAllMocks();
});
test('form renders with preselected input values', () => {
  const {
    titleInput,
    subTitleInput,
    priceInput,
    ageSelect,
    durationInput,
    descriptionInput,
    imgPreview,
  } = courseInfo;

  expect(titleInput).toHaveValue(mockCourseData.translations.ua.title);
  expect(subTitleInput).toHaveValue(mockCourseData.translations.ua.subtitle);
  expect(priceInput).toHaveValue(mockCourseData.translations.ua.price);
  expect(durationInput).toHaveValue(mockCourseData.translations.ua.duration);
  expect(descriptionInput).toHaveValue(
    mockCourseData.translations.ua.description
  );
  expect(ageSelect).toBeInTheDocument();
  expect(imgPreview).toHaveAttribute(
    'src',
    `development/${mockCourseData.path}`
  );
});
test('form validation is working on text fields', () => {
  userEvent.click(screen.getByRole('button'));
  waitFor(() => {
    expect(screen.getAllByRole('alert')).toHaveLength(7);
    expect(apiCourseData.updateCourseInfo).not.toHaveBeenCalled();
  });
});
test('form  submit with new values', async () => {
  const {
    titleInput,
    subTitleInput,
    priceInput,
    ageSelect,
    durationInput,
    descriptionInput,
    fileInput,
  } = courseInfo;
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

  userEvent.type(titleInput, 'test title');
  userEvent.type(subTitleInput, 'test subtitle');
  userEvent.type(priceInput, 'test price is 300 dollars');
  userEvent.type(durationInput, '2 hours');
  userEvent.type(descriptionInput, 'my test description');
  await selectEvent.select(ageSelect, 'children 12');
  userEvent.upload(fileInput, file);

  // Press submit button
  userEvent.click(screen.getByRole('button'));
  waitFor(() => {
    expect(updateCourseInfo).toHaveBeenCalled();
  });
});
