export default {
  state: {
    translations: {
      buttonAddLabel: 'Add',
      buttonRemoveLabel: 'Add',
    },
  },
  getters: {
    translation: state => key => state.translations[key],
    translations: state => state.translations,
  },
};
