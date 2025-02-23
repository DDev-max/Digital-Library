import { intObserver } from './intObserver';

const setIsVisible = jest.fn();
const observedElements = { current: [document.createElement('div')] };

it('should accept options as parameter', () => {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
  }));

  const options = { rootMargin: '10px' };

  intObserver({ observedElements, setIsVisible, options });

  expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);
});

it("should call 'setIsVisible' if any element is visible", () => {
  global.IntersectionObserver = jest.fn().mockImplementation(callback => {
    callback([{ isIntersecting: true }]);

    return { observe: jest.fn(), disconnect: jest.fn() };
  });

  intObserver({ observedElements, setIsVisible });

  expect(setIsVisible).toHaveBeenCalled();
});

it("shouldnt call 'setIsVisible' if no element is visible", () => {
  global.IntersectionObserver = jest.fn().mockImplementation(callback => {
    callback([{ isIntersecting: false }]);
    return { observe: jest.fn(), disconnect: jest.fn() };
  });

  intObserver({ observedElements, setIsVisible });

  expect(setIsVisible).not.toHaveBeenCalled();
});

it('should return intersection observer', () => {
  global.IntersectionObserver = jest.fn().mockImplementation(callback => {
    callback([{ isIntersecting: false }]);
    return { observe: jest.fn(), disconnect: jest.fn() };
  });

  const observer = intObserver({ observedElements, setIsVisible });

  expect(observer.disconnect).toBeDefined();
  expect(observer.observe).toBeDefined();
});
