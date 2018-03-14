export default {
  name: 'LocaleLabel',
  functional: true,
  render(createElement, context) {
    const slots = context.$slots.default;
    const key = slots ? slots[0].text : null;
    const translation = context.parent.$store.getters.translation(key);
    const text = translation || `[${key}]`;

    return createElement(
      'span',
      text,
    );
  },
};
