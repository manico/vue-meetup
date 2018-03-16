import { renderable } from '../mixins';

export default {
  name: 'SimpleElement',
  mixins: [
    renderable,
  ],
  render(createElement) {
    const slots = this.$slots.default;
    const text = slots ? slots[0].text : null;

    return createElement(
      'span',
      text,
    );
  },
};
