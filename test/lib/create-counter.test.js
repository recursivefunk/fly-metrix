const FlyMetrix = require('../../src/index');
const getTestCounter = ({
  namespace = 'MyMetrics',
  name = 'things',
} = {}) => {
  const metrics = FlyMetrix(namespace);
  const counter = metrics.Counter(name);
  return counter;
};
const rand = () => Math.floor(Math.random() * 1000);

it('it counts', () => {
  const counter = getTestCounter();
  let count = counter.count();
  expect(count).toBe(0);
  counter.inc();
  counter.inc(2);
  count = counter.count();
  expect(count).toBe(3);
  count = counter.dec(2);
  expect(count).toBe(1);
});

it('it generates a valid metric', () => {
  const counter = getTestCounter();
  let metric;
  let metricData;

  counter.inc();
  // eslint-disable-next-line
  metric = counter.getMetric();
  // eslint-disable-next-line
  metricData = metric.MetricData[0];

  expect(metric.Namespace).toBe('MyMetrics');
  expect(metricData.Unit).toBe('Count');
  expect(metricData.Value).toBe(1);
  expect(metricData.Dimensions.length).toBe(0);
});

it('it sets the count, accordingly', () => {
  const counter = getTestCounter();
  const count = counter.set(10);

  expect(counter.count()).toBe(count);
  counter.dec(2);
  expect(counter.count()).toBe(8);
});

it('it adds non-existing dimension', () => {
  const counter = getTestCounter();
  const added = counter.addDimension({ foo: 'bar' });

  expect(added).toBe(true);
});

it('replaces an existing dimension', () => {
  const counter = getTestCounter();
  counter.addDimension({ foo: 'bar' });
  const added = counter.replaceDimension({ foo: 'bang' });
  expect(added).toBe(true);

  expect(() =>
    counter.replaceDimension({ beep: 'boop' })
  ).toThrow("Unknown dimension: 'beep'");
})

it('it does not add existing dimension', () => {
  const counter = getTestCounter();
  counter.addDimension({ foo: 'bar' });
  const added = counter.addDimension({ foo: 'bar' });

  expect(added).toBe(false);
});

it('it does not add an invalid dimension', () => {
  const counter = getTestCounter();

  expect(
    () => counter.addDimension('foo'),
  ).toThrow('foo is not a valid dimension');
});

it('it does not replace a dimension an invalid dimension', () => {
  const counter = getTestCounter();

  expect(
    () => counter.replaceDimension('foo'),
  ).toThrow('foo is not a valid dimension');
});

// eslint-disable-next-line
it.skip('it reports', async () => {
  // skip, until I put in a mock
  const counter = getTestCounter();
  counter.addDimension({ foo: 'bar' });
  counter.set(rand());
  // t.doesNotThrow(async () => await counter.report());
});
