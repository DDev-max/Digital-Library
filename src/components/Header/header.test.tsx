import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchFn } from 'Utils/fetchFn/fetchFn';
import { Header } from './Header';
import type { SearchBooksApi } from 'data/types';
import { searchOptn } from './Search/searchOptn';

jest.mock('./Search/searchOptn');

jest.spyOn(console, 'error').mockImplementation(() => console.log('Mock console error')); //to avoid message: search tag is unrecognized in this browser

jest.mock('Utils/fetchFn/fetchFn');
const data: SearchBooksApi = {
  items: [
    {
      id: '123abc456',
      volumeInfo: {
        title: 'Mente Cuántica',
        authors: ['Héctor Salazar', 'María Gómez'],
      },
    },
    {
      id: '789xyz012',
      volumeInfo: {
        title: 'Evolución Estelar',
        authors: ['Alejandro Ruiz', 'Carla Fernández'],
      },
    },
  ],
};
(fetchFn as jest.Mock).mockReturnValue(data);

it("should call 'fetchFn' only once after user stops typing the search", async () => {
  const user = userEvent.setup({ delay: 100 });

  render(<Header />);
  const inputSearch = screen.getByLabelText('Search for a book');

  await user.type(inputSearch, 'Some book name');

  await waitFor(() => {
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});

it('should render search results', async () => {
  const user = userEvent.setup();

  render(<Header />);
  const inputSearch = screen.getByLabelText('Search for a book');

  await user.type(inputSearch, 'Science');

  const firstBook = await screen.findByText('Mente Cuántica', {}, { timeout: 2 * 1000 });
  const secondBook = await screen.findByText('Evolución Estelar', {}, { timeout: 2 * 1000 });

  expect(firstBook).toBeInTheDocument();
  expect(secondBook).toBeInTheDocument();
});

it('should select a search result if arrow down is pressed', async () => {
  const user = userEvent.setup();

  render(<Header />);
  const inputSearch = screen.getByLabelText('Search for a book');

  await user.type(inputSearch, 'Science');

  const allResults = await screen.findAllByRole('option', {}, { timeout: 2 * 1000 });
  expect(allResults[0]).toHaveAttribute('aria-selected', 'false');

  await user.keyboard('[ArrowDown]');
  expect(allResults[0]).toHaveAttribute('aria-selected', 'true');

  await user.keyboard('[ArrowDown]');
  expect(allResults[0]).toHaveAttribute('aria-selected', 'false');
  expect(allResults[1]).toHaveAttribute('aria-selected', 'true');
});

it('should select a search result if arrow up is pressed', async () => {
  const user = userEvent.setup();

  render(<Header />);
  const inputSearch = screen.getByLabelText('Search for a book');

  await user.type(inputSearch, 'Science');

  const allResults = await screen.findAllByRole('option', {}, { timeout: 2 * 1000 });
  expect(allResults[1]).toHaveAttribute('aria-selected', 'false');

  await user.keyboard('[ArrowUp]');
  expect(allResults[1]).toHaveAttribute('aria-selected', 'true');

  await user.keyboard('[ArrowUp]');
  expect(allResults[0]).toHaveAttribute('aria-selected', 'true');
  expect(allResults[1]).toHaveAttribute('aria-selected', 'false');
});

it('shouldnt select a search result if another arrow is pressed', async () => {
  const user = userEvent.setup();
  render(<Header />);

  const inputSearch = screen.getByLabelText('Search for a book');
  await user.type(inputSearch, 'Science');

  const allResults = await screen.findAllByRole('option', {}, { timeout: 2 * 1000 });

  await user.keyboard('[ArrowLeft]');
  await user.keyboard('[ArrowLeft]');

  expect(allResults[0]).toHaveAttribute('aria-selected', 'false');
  expect(allResults[1]).toHaveAttribute('aria-selected', 'false');
});

it('should search an option after pressing enter', async () => {
  const user = userEvent.setup();

  render(<Header />);
  const inputSearch = screen.getByLabelText('Search for a book');

  await user.type(inputSearch, 'Science');

  await user.keyboard('[ArrowDown]');
  await user.keyboard('[Enter]');

  expect(searchOptn).toHaveBeenCalled();
});
