import JsonldManager from './jsonld';

const vueMetaAppID = 'nuxt-jsonld';

export const createRootMixin = (jsonldManager: JsonldManager) => ({
  beforeCreate() {
    const isRoot = this.$root._uid === this._uid;
    if (!isRoot) {
      return;
    }
    const { set } = this.$meta().addApp(vueMetaAppID);
    jsonldManager.init(set);
  },
});

export const createJsonldMixin = (jsonldManager: JsonldManager) => ({
  beforeDestroy() {
    jsonldManager.remove(this._uid);
  },
  beforeCreate() {
    if (!this.$options.jsonld || typeof this.$options.jsonld !== 'function') {
      return;
    }
    if (!this.$options.computed) {
      this.$options.computed = {};
    }
    this.$options.computed._jsonld = this.$options.jsonld;
  },
  watch: {
    _jsonld: {
      handler(val) {
        if (val !== undefined) {
          jsonldManager.update(this._uid, val);
        }
      },
      immediate: true,
    },
  },
});
