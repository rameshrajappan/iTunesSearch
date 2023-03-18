import { cleanup, screen } from '@testing-library/react';
import { getMockTrack1, renderWithProviders } from '../utils/test-utils';
import SearchRow from '../features/medias/components/SearchRow';
afterEach(cleanup);
test('render media row', async () => {
    const trackData = getMockTrack1();
    renderWithProviders(<SearchRow track={trackData} />);
    expect(screen.getByText(/Kristen Ethridge/)).toBeTruthy();
    expect(screen.getByText(/Shelter from the Storm/)).toBeTruthy();
    expect(screen.getByText(/Fiction/)).toBeTruthy();
});