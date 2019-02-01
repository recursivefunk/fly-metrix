
const test = require('tape')
const FlyMetrix = require('../index')

test('it counts', t => {
  const metrics = FlyMetrix('MyMetrics')
  const counter = metrics.counter('things')
  let count = counter.count()

  t.equal(count, 0, 'the count is zero, initially')
  counter.inc()
  counter.inc(2)
  count = counter.count()
  t.equal(count, 3, 'the thing can count to 2')
  count = counter.dec(2)
  t.equal(count, 1, 'the thing can subtract')

  t.end()
})

test('it generates a valid metric', t => {
  const metrics = FlyMetrix('MyMetrics')
  const counter = metrics.counter('things')
  let metric

  counter.inc()
  metric = counter.getMetric()

  t.equal(metric.Namespace, 'MyMetrics', 'Namespace is correct')
  t.equal(metric.Unit, 'count', 'Unit is correct')
  t.equal(metric.Value, 1, 'Value is correct')
  t.equal(metric.Dimensions.length, 0, 'No dimensions are present')

  t.end()
})
