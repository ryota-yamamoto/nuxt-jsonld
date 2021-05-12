import plugin from '../src/plugin';

import JsonldManager from '../src/jsonld';
import { createRootMixin, createJsonldMixin } from '../src/mixins';

jest.mock('../src/jsonld');
const jsonldManagerInstanceMock = {};
const rootMixinMock = {};
const jsonldMixinMock = {};
JsonldManager.mockImplementation(() => jsonldManagerInstanceMock);
jest.mock('../src/mixins', () => ({
  createRootMixin: jest.fn(() => rootMixinMock),
  createJsonldMixin: jest.fn(() => jsonldMixinMock),
}));

const vueMock = {
  mixin: jest.fn(),
};

describe('plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('install', () => {
    plugin.install(vueMock);
    expect(JsonldManager).toBeCalledWith();
    expect(createRootMixin).toBeCalledWith(jsonldManagerInstanceMock);
    expect(createJsonldMixin).toBeCalledWith(jsonldManagerInstanceMock);
    expect(vueMock.mixin.mock.calls).toEqual([[rootMixinMock], [jsonldMixinMock]]);
  });

  test('install with options', () => {
    plugin.install(vueMock);
    expect(JsonldManager).toBeCalledWith();
    expect(createRootMixin).toBeCalledWith(jsonldManagerInstanceMock);
    expect(createJsonldMixin).toBeCalledWith(jsonldManagerInstanceMock);
    expect(vueMock.mixin.mock.calls).toEqual([[rootMixinMock], [jsonldMixinMock]]);
  });
});
