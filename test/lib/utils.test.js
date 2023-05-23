const { mapToObjArray } = require('../../src/lib/utils');

test('mapToObjArray() works', () => {
  const stuff = new Map();

  stuff.set('foo', 'bar');
  stuff.set('beep', 'boop');

  const arr = mapToObjArray(stuff);

  expect(Object.keys(arr[0])[0]).toBe('foo');
  expect(arr[0][Object.keys(arr[0])]).toBe('bar');
  expect(Object.keys(arr[1])[0]).toBe('beep');
  expect(arr[1][Object.keys(arr[1])]).toBe('boop');
});
