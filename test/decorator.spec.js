import Vue from 'vue';
import { Jsonld } from '../src/decorator';

describe('Jsonld decorator', () => {
  it('does nothing when jsonld does not exist', () => {
    const mock = Vue.extend({});
    Jsonld(mock);
    expect(mock).toBe(mock);
  });

  it('converts jsonld from methods to options', () => {
    const jsonldMock = jest.fn();
    const mock = Vue.extend({
      methods: {
        jsonld: jsonldMock,
      },
    });

    Jsonld(mock);

    expect(mock.options.methods).toEqual({});
    expect(mock.options.jsonld).toBe(jsonldMock);
  });
});
