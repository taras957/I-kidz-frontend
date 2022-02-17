import { screen, waitFor } from '@testing-library/react';
import Courses from 'components/home/courses';
import { render } from '__tests__/utils/index';
import * as homeData from 'hooks/useHomePage';
import userEvent from '@testing-library/user-event';
import '__tests__/utils/media';
const mockData = {
  courses: [
    {
      category: 'first option eng',
      is_active: false,
      path: '..path',
      title: 'test eng title',
      subtitle: 'test eng subtitle',
      description: 'test description eng',
      price: '100$',
      duration: '100',
      _id: 'id',
    },
    {
      category: 'second option eng',
      is_active: false,
      path: '..path',
      title: 'test eng',
      subtitle: 'test eng subtitle',
      description: 'second test description eng',
      price: '100dollars',
      duration: '100',
      _id: 'id',
    },
  ],
  categories: [
    { value: 'first option eng', label: 'first option eng' },
    { value: 'second option eng', label: 'second option eng' },
  ],
  _id: -1,
};

jest.spyOn(homeData, 'useHomePage').mockImplementation(() => mockData);
afterAll(() => {
  jest.restoreAllMocks();
});
describe('test for course section', () => {
  test('main elements presented in the document', async () => {
    render(<Courses />);
    expect(await screen.findByTestId('courses')).toBeInTheDocument();
    // debug();

    expect(screen.queryByRole('tablist')).toBeInTheDocument();
    expect(screen.queryAllByRole('tab')).toHaveLength(
      mockData.categories.length
    );
  });

  test('testing tab functionality', async () => {
    render(<Courses />);

    const secondTab = await screen.findByText(mockData.categories[1].label)!;
    userEvent.click(secondTab);

    const secondTabTitle = await screen.findByRole('heading', { level: 4 });

    expect(secondTabTitle).toHaveTextContent(mockData.courses[1].title);
    expect(
      await screen.findByText(mockData.courses[1].description)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockData.courses[1].subtitle)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockData.courses[1].price)
    ).toBeInTheDocument();

    const firstTab = screen.queryByText(mockData.categories[0].label)!;

    userEvent.click(firstTab);

    await waitFor(() => {
      expect(screen.getByText(mockData.courses[0].title)).toBeInTheDocument();
      expect(
        screen.getByText(mockData.courses[0].description)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockData.courses[0].subtitle)
      ).toBeInTheDocument();
      expect(screen.getByText(mockData.courses[0].price)).toBeInTheDocument();
    });
  });
});
