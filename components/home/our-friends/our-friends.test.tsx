import { screen } from '@testing-library/react';
import '__tests__/utils/media';
import OurFriends from '@/components/home/our-friends';
import { render } from '__tests__/utils/index';
import * as homeData from 'hooks/useHomePage';
import uaLocate from 'locate/ua/translate.json';

const mockData = {
  partners: [
    {
      img_path: 'img-path',
      link: 'partner link',
      title: 'hero title',
    },
  ],
};
jest.spyOn(homeData, 'useHomePage').mockImplementation(() => mockData);
afterAll(() => {
  jest.restoreAllMocks();
});

describe('testing our-friends component component', () => {
  render(<OurFriends />);

  test('it renders', async () => {
    const { link, title } = mockData.partners[0];
    const uaMotto = uaLocate.translations['friends'].title;

    const imgAlts = screen.queryAllByAltText(link);
    const partnerTitles = screen.queryAllByText(title);
    imgAlts.forEach((alt) => expect(alt).toBeInTheDocument());
    partnerTitles.forEach((node) => expect(node).toBeInTheDocument());

    expect(screen.queryByRole('heading', { level: 2 })).toHaveTextContent(
      uaMotto
    );
  });
});
