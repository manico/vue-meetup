export default {
  name: 'TextHeading',
  functional: true,
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render(createElement, context) {
    return createElement(
      `h${context.props.level}`,
      context.slots().default,
    );
  },
};
