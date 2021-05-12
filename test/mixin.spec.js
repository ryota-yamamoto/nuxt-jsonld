import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { createRootMixin, createJsonldMixin } from '../src/mixins';

const jsonldManagerMock = {
  init: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};
const vueMetaMock = jest.fn(() => ({}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createRootMixin', () => {
  const mixin = createRootMixin(jsonldManagerMock);

  test('init on beforeCreate', () => {
    const thisMock = {
      _uid: 0,
      $root: {
        _uid: 0,
      },
      $meta: vueMetaMock,
    };

    mixin.beforeCreate.call(thisMock);
    expect(jsonldManagerMock.init).toBeCalledWith(thisMock);
  });

  test('run only root', () => {
    const thisMock = {
      _uid: 1,
      $root: {
        _uid: 0,
      },
      $meta: vueMetaMock,
    };

    mixin.beforeCreate.call(thisMock);
    expect(jsonldManagerMock.init).not.toBeCalled();
  });
});

describe('createJsonldMixin', () => {
  const mixin = createJsonldMixin(jsonldManagerMock);

  it('does nothing when jsonld method does not exist', () => {
    const thisMock = {
      _uid: 12,
      $meta: vueMetaMock,
      $options: {},
    };

    mixin.beforeCreate.call(thisMock);
    expect(thisMock.$options.computed).toBeUndefined();
  });

  test('update jsonld', async () => {
    const mockVm = Vue.extend({
      mixins: [mixin],
      data() {
        return {
          count: 0,
        };
      },
      methods: {
        increment() {
          this.count += 1;
        },
      },
      jsonld() {
        return {
          count: this.count,
        };
      },
      render(h) {
        return h();
      },
    });

    const wrapper = mount(mockVm);
    expect(jsonldManagerMock.update).toBeCalledWith(1, { count: 0 });
    wrapper.vm.increment();
    await wrapper.vm.$nextTick();
    expect(jsonldManagerMock.update).toBeCalledWith(1, { count: 1 });
    wrapper.destroy();
    expect(jsonldManagerMock.remove).toBeCalledWith(1);
  });
});
