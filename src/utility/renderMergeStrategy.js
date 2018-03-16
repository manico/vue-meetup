import Vue from 'vue';

// eslint-disable-next-line
export function addRenderMergeStrategy() {
  Vue.config.optionMergeStrategies.render = (parentVal, childVal) => {
    if (parentVal) {
      const newParentVal = function render(...args) {
        args.push([childVal.apply(this, args)]);
        return parentVal.apply(this, args);
      };

      return newParentVal;
    }

    return childVal;
  };
}
