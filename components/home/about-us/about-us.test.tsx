import { screen } from '@testing-library/react';
import AboutUs from '@/components/home/about-us';
import { render } from '__tests__/utils/index';

describe('testing about us component', () => {
  test(' to be in document', async () => {
    render(<AboutUs />);

    const section = screen.queryByTestId('about-us');
    expect(section).toBeInTheDocument();
    expect(section).toMatchSnapshot();
  });
});
