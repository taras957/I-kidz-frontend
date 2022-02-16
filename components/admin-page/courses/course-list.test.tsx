import { render, screen } from '__tests__/utils';
import CoursesList from 'components/admin-page/courses';

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
test('should render table with data', () => {
  render(<CoursesList courses={mockData} />);
  expect(screen.queryByRole('table')).toBeInTheDocument();
});
test.todo('should display delete & edit buttons');
