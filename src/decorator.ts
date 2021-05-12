import Vue, { ComponentOptions } from 'vue';

type Target = {
  options?: ComponentOptions<Vue> & {
    jsonld?: any;
  };
} & typeof Vue;

export default (target: Target): void => {
  const { options } = target;

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  target.options.jsonld = options.methods.jsonld;
  delete target.options.methods.jsonld;
};
