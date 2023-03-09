import { cleanup, screen, fireEvent, within ,waitFor, getByRole} from '@testing-library/react';
import { renderSearch } from '../utils/test-utils';
afterEach(cleanup);
test('renders search page', async () => {
    const { asFragment } = renderSearch();
    expect(asFragment).toMatchSnapshot();
    const searchButton = screen.getByTestId("searchButton");
    const searchMaterialButton = screen.getByTestId("searchTerm");
    const searchInput = within(searchMaterialButton).getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);
    const searchResults = await screen.findByTestId("searchResults", {}, { timeout: 5000 });
    const searchItems = within(searchResults).getAllByRole("listitem");
    expect(searchItems.length).toBeGreaterThan(0);
    expect(searchItems[0]).toHaveClass("search-item");
    // screen.debug();
});