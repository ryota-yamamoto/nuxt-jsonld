import { VueMetaApp } from 'vue-meta';

const hid = 'nuxt-jsonld';

type Options = {
  space: string | number;
};

type JsonKey = string | number;

class JsonldManager {
  private options: Options;

  private data: { [key: string]: object } = {};

  private set: VueMetaApp['set'];

  constructor(options: Options) {
    this.options = options;
  }

  init(set: VueMetaApp['set']) {
    this.set = set;
  }

  update(key: JsonKey, jsonld: object) {
    this.data[key] = jsonld;
    this.refresh();
  }

  remove(key: JsonKey) {
    delete this.data[key];
    this.refresh();
  }

  private refresh() {
    if (!this.set) {
      console.warn('Do not refresh before init');
      return;
    }
    const data = Object.entries(this.data)
      .map(([_k, v]) => v)
      .filter((v) => v);

    this.set({
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(data, null, this.options.space),
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    });
  }
}

export default JsonldManager;
