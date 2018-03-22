import Vue from 'vue';

const compiled = Vue.compile('<div>{{message}}</div>');

export default {
  data() {
    return {
      message: 'Hello NSoft',
    };
  },
  render: compiled.render,
  staticRenderFns: compiled.staticRenderFns,
};
