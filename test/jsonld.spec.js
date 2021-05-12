import JsonldManager from '../src/jsonld';

const spyWarn = jest.spyOn(console, 'warn');
spyWarn.mockImplementation((x) => x);

describe('JsonldManager', () => {
  test("'init' must be called before 'refresh'", () => {
    const jsonldManager = new JsonldManager({
      space: '',
    });
    jsonldManager.update('vm', {});
    expect(spyWarn).toBeCalledWith('Do not refresh before init');
  });

  test('update calls set function', () => {
    const jsonldManager = new JsonldManager({
      space: '',
    });
    const setMock = jest.fn();
    jsonldManager.init(setMock);

    jsonldManager.update('vm1', {
      name: 'foo',
    });

    expect(setMock).toBeCalledWith({
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-jsonld': ['innerHTML'],
      },
      script: [
        {
          hid: 'nuxt-jsonld',
          innerHTML: '[{"name":"foo"}]',
          type: 'application/ld+json',
        },
      ],
    });

    jsonldManager.update('vm2', {
      name: 'bar',
    });

    expect(setMock).toBeCalledWith({
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-jsonld': ['innerHTML'],
      },
      script: [
        {
          hid: 'nuxt-jsonld',
          innerHTML: '[{"name":"foo"},{"name":"bar"}]',
          type: 'application/ld+json',
        },
      ],
    });
  });

  test('remove calls set function', () => {
    const jsonldManager = new JsonldManager({
      space: '',
    });
    const setMock = jest.fn();
    jsonldManager.init(setMock);

    jsonldManager.update('vm1', {
      name: 'foo',
    });
    jsonldManager.update('vm2', {
      name: 'bar',
    });
    setMock.mockClear();
    jsonldManager.remove('vm1');

    expect(setMock).toBeCalledWith({
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-jsonld': ['innerHTML'],
      },
      script: [
        {
          hid: 'nuxt-jsonld',
          innerHTML: '[{"name":"bar"}]',
          type: 'application/ld+json',
        },
      ],
    });
  });
});
