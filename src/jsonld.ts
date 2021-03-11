import type Vue from 'vue';

const jsonldHid = 'nuxt-jsonld';

class JsonldManager {
  private data: { [key: string]: object } = {};

  private root: Vue;

  init(root: Vue) {
    this.root = root;
  }

  update(uid: string, jsonld: object) {
    this.data[uid] = jsonld;
    this.refresh();
  }

  remove(uid: string) {
    delete this.data[uid];
    this.refresh();
  }

  private deleteTag() {
    const excluded = this.root.$options.head.script.filter(({ hid }) => hid !== jsonldHid);
    this.root.$options.head.script = excluded;
  }

  private refresh() {
    if (!this.root) {
      throw new Error('must be initialized before refreshing');
    }

    this.root.$options.head = this.root.$options.head || {};
    this.root.$options.head.script = this.root.$options.head.script || [];

    const json = Object.entries(this.data)
      .map(([_k, v]) => v)
      .filter((v) => v);

    const jsonldTag = this.root.$options.head.script.find(({ hid }) => hid === jsonldHid);

    if (json.length === 0) {
      this.deleteTag();
    } else if (jsonldTag) {
      jsonldTag.json = json;
    } else {
      // @ts-ignore
      this.root.$options.head.script.push({
        hid: jsonldHid,
        type: 'application/ld+json',
        json,
      });
    }

    if (process.browser) {
      this.root.$meta().refresh();
    }
  }
}

export default JsonldManager;
