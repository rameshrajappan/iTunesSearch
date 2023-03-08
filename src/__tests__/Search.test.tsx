import { cleanup, screen, fireEvent } from '@testing-library/react';
import { renderSearch } from '../utils/test-utils';
afterEach(cleanup);
test('renders search page', () => {
    const { asFragment } = renderSearch();
    expect(asFragment).toMatchSnapshot();
    const searchButton = screen.getByTestId("searchButton");
    const searchMaterialButton = screen.getByTestId("searchTerm");
    const searchInput = searchMaterialButton.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);
});