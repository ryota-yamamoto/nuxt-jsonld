import type { Thing, WithContext } from 'schema-dts';

export type JsonldFunc = () => WithContext<Thing> | WithContext<Thing>[] | null

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends Vue> {
    jsonld?: JsonldFunc;
  }
}
