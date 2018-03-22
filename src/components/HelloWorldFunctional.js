export default {
  name: 'HelloWorldFunctional',
  functional: true,
  render(createElement, context) {
    const slots = context.slots().default;
    const text = slots ? slots[0].text : null;

    return createElement(
      'span',
      text,
    );
  },
};
