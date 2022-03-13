/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, waitFor } from '__tests__/utils';
import userEvent from '@testing-library/user-event';
import * as partners from 'domain/partner/data';
import PartnersList from '.';
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
jest.spyOn(partners, 'updatePartner').mockImplementation(mockUpdate);
jest.spyOn(partners, 'removePartner').mockImplementation(mockDelete);

const mockData = [
  {
    imgPath: './',
    isActive: true,
    link: '..img',
    title: 'test data',
    id: 'idTest',
  },
];

afterEach(() => jest.resetAllMocks());

afterAll(() => jest.restoreAllMocks());

test('should render table with data', () => {
  render(<PartnersList partners={mockData} />);

  expect(screen.queryByRole('table')).toBeInTheDocument();
  expect(screen.queryAllByRole('row')).toHaveLength(2);
});

test('edit link should have correct href', () => {
  render(<PartnersList partners={mockData} />);

  const editLink = screen.queryByRole('link')!;
  expect(editLink).toHaveAttribute(
    'href',
    `/partners/edit-partner-info/${mockData[0].id}`
  );
});

test('delete btn should should be called with right params', () => {
  render(<PartnersList partners={mockData} />);

  const deleteBtn = screen.queryByText(/delete/i)!;
  userEvent.click(deleteBtn);

  waitFor(() => {
    expect(mockDelete).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(mockData[0].id);
  });
});
