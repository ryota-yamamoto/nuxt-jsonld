import JsonldManager from '../src/jsonld';

describe('JsonldManager', () => {
  test("'init' must be called before 'refresh'", () => {
    const jsonldManager = new JsonldManager();
    expect(() => jsonldManager.update('vm', {})).toThrowError('must be initialized before refreshing');
  });

  it('updates root head script', () => {
    process.browser = false;
    const jsonldManager = new JsonldManager();
    const rootMock = {
      $options: {
        head: jest.fn(),
      },
      $meta() {
        return {
          refresh: jest.fn(),
        };
      },
    };

    jsonldManager.init(rootMock);

    jsonldManager.update('vm1', {
      name: 'foo',
    });

    expect(rootMock.$options.head.script).toEqual([
      {
        hid: 'nuxt-jsonld',
        json: [{ name: 'foo' }],
        type: 'application/ld+json',
      },
    ]);
    jsonldManager.update('vm2', {
      name: 'bar',
    });

    expect(rootMock.$options.head.script).toEqual([
      {
        hid: 'nuxt-jsonld',
        json: [{ name: 'foo' }, { name: 'bar' }],
        type: 'application/ld+json',
      },
    ]);
  });

  test('refresh on browser', () => {
    process.browser = true;
    const jsonldManager = new JsonldManager();
    const refreshMock = jest.fn();
    const rootMock = {
      $options: {
        head: jest.fn(),
      },
      $meta() {
        return {
          refresh: refreshMock,
        };
      },
    };

    jsonldManager.init(rootMock);
    jsonldManager.update('vm1', { name: 'foo' });
    expect(refreshMock).toBeCalledTimes(1);
  });

  test('remove', () => {
    const jsonldManager = new JsonldManager();
    const refreshMock = jest.fn();
    const rootMock = {
      $options: {
        head: jest.fn(),
      },
      $meta() {
        return {
          refresh: refreshMock,
        };
      },
    };
    jsonldManager.init(rootMock);
    jsonldManager.update('vm1', { name: 'foo' });
    jsonldManager.update('vm2', { name: 'bar' });
    refreshMock.mockClear();

    // delete vm1
    jsonldManager.remove('vm1');
    expect(rootMock.$options.head.script).toEqual([
      {
        hid: 'nuxt-jsonld',
        json: [{ name: 'bar' }],
        type: 'application/ld+json',
      },
    ]);
    expect(refreshMock).toBeCalledTimes(1);

    // delete vm2
    jsonldManager.remove('vm2');
    // delete nuxt-jsonld tag when json is empty
    expect(rootMock.$options.head.script).toEqual([]);
    expect(refreshMock).toBeCalledTimes(2);
  });
});
