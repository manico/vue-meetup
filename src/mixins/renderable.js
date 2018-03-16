/*
Mixin for testing merging option of render function.
*/
export default {
  render(createElement, createChildrenElements) {
    return createElement(
      'div',
      {
        staticClass: 'container',
        staticStyle: {
          background: 'red',
          padding: '1em',
        },
      },
      [
        'Parent',
        ...createChildrenElements,
      ],
    );
  },
};
