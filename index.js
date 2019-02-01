
const {
  genCounterMetric
} = require('./lib/utils')

const Metrix = function (namespace='Metrix') {
  return Object.create({
    counter (name='counter') {
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
  })
}

module.exports = Metrix
