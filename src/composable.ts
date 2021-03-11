import { getCurrentInstance } from '@vue/composition-api';
import { JsonldFunc } from './type'

export const useJsonld = (jsonFunc: JsonldFunc) => {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('This must be called within a setup function.');
  }

  if (!vm.$options.computed) {
    vm.$options.computed = {};
  }

  vm.$options.computed._jsonld = jsonFunc;
};
