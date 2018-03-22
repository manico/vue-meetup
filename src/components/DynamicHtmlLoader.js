const loadingComponent = {
  template: '<div>Loading...</div>',
};

export default {
  functional: true,
  props: {
    template: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  render(createElement, context) {
    const { template } = context.props;
    const component = template ? {
      template,
      data() {
        return {
          message: context.props.message,
        };
      },
    } : loadingComponent;

    return createElement(component);
  },
};
