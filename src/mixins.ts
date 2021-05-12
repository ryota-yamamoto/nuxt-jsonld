import JsonldManager from './jsonld';

export const createRootMixin = (jsonldManager: JsonldManager) => ({
  beforeCreate() {
    const isRoot = this.$root._uid === this._uid;
    if (!isRoot) {
      return;
    }

    jsonldManager.init(this);
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
        jsonldManager.update(this._uid, val);
      },
      immediate: true,
    },
  },
});
