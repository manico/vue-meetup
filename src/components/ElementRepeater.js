// import { range } from 'lodash';

export default {
  name: 'ElementRepeater',
  render(createElement) {
    const el = createElement('div', 'Repeater Item');
    return createElement('div', [
      el,
      el,
    ]);

    /* return createElement('div',
      range(10).map(() => createElement('div', 'Repeater Item')),
    ); */
  },
};
