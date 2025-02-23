import { renderHook } from '@testing-library/react';
import { useFavoritesContext } from './useFavoritesContext';
import { useContext } from 'react';
import { NoProviderError } from './NoProviderError';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(jest.fn());

it('should throw error if context is undefined', () => {
  (useContext as jest.Mock).mockReturnValueOnce(undefined);

  expect(() => renderHook(useFavoritesContext)).toThrow(NoProviderError);
});

it('should return context', () => {
  const mockContextValue = { favorites: [{ id: 1 }] };
  (useContext as jest.Mock).mockReturnValueOnce(mockContextValue);

  const { result } = renderHook(useFavoritesContext);

  expect(result.current).toEqual(mockContextValue);
});
