const test = require('tape');
const { mapToObjArray } = require('../src/lib/utils');

test('mapToObjArray() works', (t) => {
  const stuff = new Map();

  stuff.set('foo', 'bar');
  stuff.set('beep', 'boop');

  const arr = mapToObjArray(stuff);

  t.equal(Object.keys(arr[0])[0], 'foo', 'first key is correct');

  t.equal(arr[0][Object.keys(arr[0])], 'bar', 'first value is correct');

  t.equal(Object.keys(arr[1])[0], 'beep', 'second key is correct');

  t.equal(arr[1][Object.keys(arr[1])], 'boop', 'value value is correct');

  t.end();
});
