import type { MetaInfo } from 'vue-meta';
import type Vue from 'vue';

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends Vue> {
    head?: MetaInfo;
  }
}
