import { render, screen } from '@testing-library/react';
import { getPreviousContent } from './getPreviousContent';

const ParagraphWithNestedElements = () => (
  <p>
    This is an paragraph
    <span className='contextMenu_color--first'> with some </span>
    nested tags we are simulating a<span className='contextMenu_color--first'> highlighted</span>
    paragraph
  </p>
);

it('should return all previous plain text of a nested element', () => {
  render(<ParagraphWithNestedElements />);

  const nestedElement = screen.getByText('highlighted');

  const { fullPreviousPlainText } = getPreviousContent(nestedElement);

  expect(fullPreviousPlainText).toBe('This is an paragraph with some nested tags we are simulating a highlighted');
});

it('should return all previous html of a nested element', () => {
  render(<ParagraphWithNestedElements />);

  const nestedElement = screen.getByText('highlighted');

  const { fullPreviousHtml } = getPreviousContent(nestedElement);

  expect(fullPreviousHtml).toBe(
    'This is an paragraph<span class="contextMenu_color--first"> with some </span>nested tags we are simulating a<span class="contextMenu_color--first"> highlighted</span>'
  );
});
