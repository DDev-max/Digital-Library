import { ellipsisText } from './ellipsisText';

it('should return the same text if it doesnt exceed the max length', () => {
  const originalText = 'Hi';

  const textConversion = ellipsisText({ maxLength: 20, text: originalText });

  expect(textConversion).toBe(originalText);
});

it('should return a text with ellipsis if it exceeds the max length', () => {
  const textConversion = ellipsisText({ maxLength: 3, text: 'How are you?' });

  expect(textConversion).toBe('How...');
});
