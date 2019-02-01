
const {
  genCounterMetric
} = require('./utils')

module.exports = (name, namespace) => {
  let n = 0
  return {
    inc (amnt = 1) {
      n = n + amnt
      return n
    },
    dec (amnt = 1) {
      n = n - amnt
      return n
    },
    count: () => n,
    getMetric: () => genCounterMetric(n, { namespace, name })
  }
}
