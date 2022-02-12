import { screen } from '@testing-library/react';
import Hero from '@/components/home/hero';
import { render } from '__tests__/utils/index';
import { projectBootstrapQuery } from 'queries/index';
import i18n from 'i18n';
import * as homeData from 'hooks/useHomePage';

const intersectionObserverMock = () => ({
  observe: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);
const mockData = {
  hero: {
    button: 'hero button',
    sub_title: 'subtitle',
    title: 'hero title',
  },
};
afterAll(() => {
  jest.restoreAllMocks();
});
jest.spyOn(homeData, 'useHomePage').mockImplementation(() => mockData);

describe('testing hero component', () => {
  async function setupHero() {
    const { queryClient, rerender } = render(<Hero />);
    queryClient.setQueryData(projectBootstrapQuery, mockData);

    rerender(<Hero />);

    const heroSection = await screen.findByTestId('hero');

    const heroButton = await screen.findByRole('button');
    const heroTitle = await screen.findByRole('heading', { level: 1 });

    return { queryClient, rerender, heroSection, heroButton, heroTitle };
  }

  test(' ua translate to be in document', async () => {
    const { button, title } = mockData.hero;
    const { rerender } = await setupHero();

    const heroSection = await screen.findByTestId('hero');

    const heroButton = await screen.findByRole('button');
    const heroTitle = await screen.findByRole('heading', { level: 1 });

    rerender(<Hero />);

    const heroSubTitle = await screen.findByText(/subtitle/i);
    expect(heroSection).toBeInTheDocument();
    expect(heroButton).toHaveTextContent(button);
    expect(heroSubTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent(title);
  });
  test('eng translate to be in document', async () => {
    const { button, title } = mockData.hero;

    const { rerender, heroSection, heroButton, heroTitle } = await setupHero();
    i18n.changeLanguage('eng');
    rerender(<Hero />);

    const heroSubTitle = await screen.findByText(/subtitle/i);
    expect(heroSection).toBeInTheDocument();
    expect(heroButton).toHaveTextContent(button);
    expect(heroSubTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent(title);
  });
});
