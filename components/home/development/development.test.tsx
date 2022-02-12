import Development from '@/components/home/development';
import { render, screen } from '__tests__/utils/index';
import uaLocate from 'locate/ua/translate.json';
describe('testing hero component', () => {
  test('development renders', async () => {
    render(<Development />);
    const uaTitle = uaLocate.translations.development.title;
    expect(screen.queryByRole('heading', { level: 5 })).toHaveTextContent(
      uaTitle
    );
  });
});
