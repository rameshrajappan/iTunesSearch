import { cleanup, screen } from '@testing-library/react';
import { renderApp } from '../utils/test-utils';
afterEach(cleanup);
test('renders app', () => {
  const { asFragment } = renderApp();
  expect(asFragment).toMatchSnapshot();
  const headerElement = screen.getByText(/iTunes Search/i);
  expect(headerElement).toBeInTheDocument();
});
