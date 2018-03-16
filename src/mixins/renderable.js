/*
Mixin for testing merging option of render function.
*/
export default {
  render(createElement, children) {
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
        ...children,
      ],
    );
  },
};
