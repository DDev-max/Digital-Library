import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import LandingPage from './page';
import { FavoritesContextProvider } from 'Context/FavoritesContextProvider';
import { mockLandingFetch } from 'mocks/fetchMock';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockLandingFetch),
    ok: true,
  })
) as jest.Mock;

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

it('should change the slider img when the button is pressed.', async () => {
  const user = userEvent.setup();
  const awaitedPage = await LandingPage();

  render(<FavoritesContextProvider>{awaitedPage}</FavoritesContextProvider>);

  const firstSliderElement = screen.getByText('Our latest books.');
  const firstElementBtn = screen.getByRole('tab', { name: /Click to see image number 1/i });

  expect(firstElementBtn).toHaveAttribute('aria-selected', 'true');
  expect(firstSliderElement).toBeVisible();

  const secondSliderElement = screen.getByText('The best business books');
  const secondElementBtn = screen.getByRole('tab', { name: /Click to see image number 2/i });

  expect(secondSliderElement).not.toBeVisible();
  await user.click(secondElementBtn);

  expect(secondSliderElement).toBeVisible();
  expect(secondElementBtn).toHaveAttribute('aria-selected', 'true');
  expect(firstElementBtn).toHaveAttribute('aria-selected', 'false');
  expect(firstSliderElement).not.toBeVisible();
});

it('should change the label when a book is added to the fav list', async () => {
  const user = userEvent.setup();
  const awaitedPage = await LandingPage();

  render(<FavoritesContextProvider>{awaitedPage}</FavoritesContextProvider>);

  const favoritesButton = screen.getByRole('button', { name: 'Add to favorites list' });
  await user.click(favoritesButton);

  expect(favoritesButton).toHaveAttribute('aria-label', 'Remove from favorites list');
});

it('should display an error when fetch fails', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 429,
      statusText: 'Server Error',
      ok: false,
    })
  ) as jest.Mock;

  const awaitedPage = await LandingPage();
  render(<FavoritesContextProvider>{awaitedPage}</FavoritesContextProvider>);

  const errorMessage = screen.getByText(/please come back later/i);
  expect(errorMessage).toBeInTheDocument();
});
