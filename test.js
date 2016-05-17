import test from 'tape';
import element from 'magic-virtual-element';
import TextareaAutosize from './index';
import {renderString, render, tree} from 'deku';

test('Simple render', t => {
  const actual = renderString(tree(<TextareaAutosize>content</TextareaAutosize>));
  const expected = renderString(tree(<textarea>content</textarea>));

  t.is(actual, expected);
  t.end();
});

test('Props are passed to element', t => {
  const actual = renderString(tree(<TextareaAutosize class='class' data-foo='bar'>content</TextareaAutosize>));
  const expected = renderString(tree(<textarea class='class' data-foo='bar'>content</textarea>));

  t.is(actual, expected);
  t.end();
});

if (process.browser) {
  test('Set height + grow', t => {
    const container = document.body.appendChild(document.createElement('div'));

    const app = tree(<TextareaAutosize>content</TextareaAutosize>);
    render(app, container);

    const actual = container.querySelector('textarea').style.height;
    const expected = '32px';

    t.is(actual, expected, 'initial size');

    app.mount(<TextareaAutosize>
      content content content content content content content content content content content content
    </TextareaAutosize>);

    process.nextTick(() => {
      const actualResized = container.querySelector('textarea').style.height;
      const expectedResized = '58px';
      t.is(actualResized, expectedResized, 'resized');
      t.end();
    });
  });

  test('Set height + shrink', t => {
    const container = document.body.appendChild(document.createElement('div'));

    const app = tree(<TextareaAutosize>
      content content content content content content content content content content content content
    </TextareaAutosize>);
    render(app, container);

    const actual = container.querySelector('textarea').style.height;
    const expected = '58px';

    t.is(actual, expected, 'initial size');

    app.mount(<TextareaAutosize>content</TextareaAutosize>);

    process.nextTick(() => {
      const actualResized = container.querySelector('textarea').style.height;
      const expectedResized = '32px';
      t.is(actualResized, expectedResized, 'resized');
      t.end();
    });
  });
}
