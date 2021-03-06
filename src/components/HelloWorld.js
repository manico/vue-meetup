export default {
  name: 'HelloWorld',
  render(createElement) {
    const slots = this.$slots.default;
    const text = slots ? slots[0].text : null;

    return createElement(
      'span',
      text,
    );
  },
};
