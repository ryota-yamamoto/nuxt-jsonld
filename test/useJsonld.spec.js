import { getCurrentInstance } from '@vue/composition-api';
import { useJsonld } from '../src/useJsonld';

jest.mock('@vue/composition-api');

beforeEach(() => {
  jest.clearAllMocks();
});

test('useJsonld', () => {
  const vmMock = {
    $options: {},
  };
  getCurrentInstance.mockImplementation(() => vmMock);

  useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'test product',
  }));

  expect(vmMock.$options.jsonld()).toEqual({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'test product',
  });
});

test('throws an error when called from outside of setup', () => {
  getCurrentInstance.mockImplementation(() => undefined);

  expect(() =>
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'test product',
    }))
  ).toThrowError('This must be called within a setup function.');
});
