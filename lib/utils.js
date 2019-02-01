
const genCounterMetric = (n, { namespace = 'Metrix', name = 'counter', dimensions = [] }) => (
  {
    Namespace: namespace,
    Unit: 'count',
    Value: n,
    Timestamp: Math.floor(new Date() / 1000),
    Dimensions: dimensions
  }
)

module.exports = {
  genCounterMetric
}
