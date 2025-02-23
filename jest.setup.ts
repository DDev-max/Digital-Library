import '@testing-library/jest-dom'

jest.mock('next/navigation', () => {
  return {
    usePathname: () => ({
      pathname: '',
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
      set: () => {},
    }),
  }
})
