import VueT from 'vue';
import { Thing, WithContext } from 'schema-dts';
import decorator from './decorator';
import plugin from './plugin';

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => WithContext<Thing> | WithContext<Thing>[] | null;
  }
}

export const Jsonld = decorator;
export default plugin;
