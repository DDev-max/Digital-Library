import type { Item } from 'data/types';
import { removeAddFav } from './removeAddFav';

const setFavorites = jest.fn();
const selection: Item = {
  id: '1',
  volumeInfo: {
    authors: ['A'],
    description: 'B',
    imageLinks: { smallThumbnail: 'a', thumbnail: 'b' },
    title: 'a',
  },
};

it('should add a book to the favorite list', () => {
  removeAddFav({ alreadyAdded: false, selection, setFavorites });

  expect(setFavorites).toHaveBeenCalledTimes(1);

  const updateFunction = setFavorites.mock.calls[0][0];
  const newFavorites = updateFunction([]);

  expect(newFavorites).toEqual([selection]);
});

it('should remove a book from the favorite list', () => {
  removeAddFav({ alreadyAdded: true, selection, setFavorites });

  expect(setFavorites).toHaveBeenCalledTimes(1);

  const updateFunction = setFavorites.mock.calls[0][0];
  const newFavorites = updateFunction([]);

  expect(newFavorites).toEqual([]);
});
