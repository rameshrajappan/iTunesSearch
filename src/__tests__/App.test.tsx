import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../utils/test-utils';
afterEach(cleanup);
test('renders app', () => {
  const { asFragment } = renderWithProviders(<App />);
  expect(asFragment).toMatchSnapshot();
  const headerElement = screen.getByText(/iTunes Search/i);
  expect(headerElement).toBeInTheDocument();
});
