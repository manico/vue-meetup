export default {
  name: 'ElementWrapper',
  render(createElement) {
    return createElement('div', [
      this.$scopedSlots.default({
        message: 'Hello NSoft',
      }),
    ]);
  },
};
