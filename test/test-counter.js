const test = require('tape');
const FlyMetrix = require('../src/index');
const getTestCounter = ({
  namespace = 'MyMetrics',
  name = 'things',
} = {}) => {
  const metrics = FlyMetrix(namespace);
  const counter = metrics.Counter(name);
  return counter;
};
const rand = () => Math.floor(Math.random() * 1000);

test('it counts', (t) => {
  const counter = getTestCounter();
  let count = counter.count();

  t.equal(count, 0, 'the count is zero, initially');
  counter.inc();
  counter.inc(2);
  count = counter.count();
  t.equal(count, 3, 'the thing can count to 2');
  count = counter.dec(2);
  t.equal(count, 1, 'the thing can subtract');

  t.end();
});

test('it generates a valid metric', (t) => {
  const counter = getTestCounter();
  let metric;
  let metricData;

  counter.inc();
  // eslint-disable-next-line
  metric = counter.getMetric();
  // eslint-disable-next-line
  metricData = metric.MetricData[0];

  t.equal(metric.Namespace, 'MyMetrics', 'Namespace is correct');
  t.equal(metricData.Unit, 'Count', 'Unit is correct');
  t.equal(metricData.Value, 1, 'Value is correct');
  t.equal(metricData.Dimensions.length, 0, 'No dimensions are present');

  t.end();
});

test('it sets the count, accordingly', (t) => {
  const counter = getTestCounter();
  const count = counter.set(10);

  t.equal(counter.count(), count, 'the count was successfully set to 10');
  counter.dec(2);
  t.equal(counter.count(), 8, 'the count was successfully decremented');
  t.end();
});

test('it adds non-existing dimension', (t) => {
  const counter = getTestCounter();
  const added = counter.addDimension({ foo: 'bar' });

  t.equal(added, true, 'dimension was successfully added');
  t.end();
});

test('it does not add existing dimension', (t) => {
  const counter = getTestCounter();
  counter.addDimension({ foo: 'bar' });
  const added = counter.addDimension({ foo: 'bar' });

  t.equal(added, false, 'existing dimension was not added');
  t.end();
});

test('it does not add an invalid dimension', (t) => {
  const counter = getTestCounter();

  t.throws(
    () => counter.addDimension('foo'),
    'foo is not a valid dimension',
    'an invalid dimension throws an error'
  );

  t.end();
});

// eslint-disable-next-line
test.skip('it reports', async (t) => {
  // skip, until I put in a mock
  const counter = getTestCounter();
  counter.addDimension({ foo: 'bar' });
  counter.set(rand());
  t.doesNotThrow(async () => await counter.report());
  t.end();
});
