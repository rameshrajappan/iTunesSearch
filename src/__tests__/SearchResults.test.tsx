import { cleanup, screen, within } from '@testing-library/react';
import { getMockSearchData, renderWithProviders } from '../utils/test-utils';
import SearchResults from '../features/medias/components/SearchResults';
afterEach(cleanup);
test('when zero results', async () => {
    renderWithProviders(<SearchResults />, {
        preloadedState: {
            itunes: {
                medias: { results: [], resultCount: 0 },
                status: 'succeeded',
                currentPage: 1,
                error: ''
            }
        }
    });
    const noResultsDisplay = screen.getByText(/No Results/);
    expect(noResultsDisplay).toBeTruthy();
});

test('when two results', async () => {
    renderWithProviders(<SearchResults />, {
        preloadedState: {
            itunes: {
                medias: getMockSearchData(),
                status: 'succeeded',
                currentPage: 1,
                error: ''
            }
        }
    });
    expect(screen.getByText(/We found/)).toBeTruthy();
    const searchResults = screen.getByTestId("searchResults");
    expect(searchResults).toBeTruthy();
    expect(within(searchResults).getAllByRole("listitem")).toHaveLength(2);
});