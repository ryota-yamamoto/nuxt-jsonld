import VueT from 'vue';
import JsonldManager from './jsonld';
import { createRootMixin, createJsonldMixin } from './mixins';

export default {
  install(Vue: typeof VueT, options = {}) {
    const opts = {
      ...{
        space: '',
      },
      ...options,
    };
    const jsonldManager = new JsonldManager(opts);
    const rootMixin = createRootMixin(jsonldManager);
    const jsonldMixin = createJsonldMixin(jsonldManager);
    Vue.mixin(rootMixin);
    Vue.mixin(jsonldMixin);
  },
};
