
const AWS = require('aws-sdk')
const env = require('good-env')
const genCounterMetric = (n, { namespace = 'FlyMetrix/metrics', name = 'counter', dimensions = [] }) => (
  {
    Namespace: namespace,
    MetricData: [
      {
        MetricName: name,
        Unit: 'Count',
        Value: n,
        Timestamp: Math.floor(new Date() / 1000),
        Dimensions: dimensions
      }
    ]
  }
)
const region = env.get('AWS_REGION', 'us-east-1')
const cloudwatch = new AWS.CloudWatch({ region })

module.exports = (name, namespace) => {
  let n = 0
  let dimensions = []

  return Object.freeze({
    /**
     * Set the count to equal the amount specified
     *
     * @param amnt The amount to which the counter should be set
     */
    set (amnt) {
      if (!isNum(amnt)) throw Error(`${amnt} is not a number`)
      n = amnt
      return n
    },

    /**
     * Increments the current count by the specified amount
     *
     * @param amnt The amount by which we should increment the count. Defaults
     * to 1
     */
    inc (amnt = 1) {
      if (!isNum(amnt)) throw Error(`${amnt} is not a number`)
      n = n + amnt
      return n
    },

    /**
     * Decrements the current count by the specified amount
     *
     * @param amnt The amount by which we should decrement the count. Defaults
     * to 1
     */
    dec (amnt = 1) {
      if (!isNum(amnt)) throw Error(`${amnt} is not a number`)
      n = n - amnt
      return n
    },

    /**
     * Gets the current count value
     */
    count: () => n,

    /**
     * Adds a unique diminsion to the current set
     *
     * @param d The new dimension to add
     *
     */
    addDimension: d => {
      if (!isDimensionObj(d)) throw Error(`${d} is not a valid dimension`)
      const key = Object.keys(d)[0]
      const hasDimension = dimensions.some(i => Object.keys(i)[0] === key)

      if (!hasDimension) {
        dimensions.push(d)
        return true
      }
      return false
    },

    getMetric: () => genCounterMetric(n, { namespace, name }),

    reset () {
      n = 0
    },

    report () {
      return new Promise((resolve, reject) => {
        const metric = this.getMetric()
        cloudwatch.putMetricData(metric).promise()
          .then(r => {
            this.reset()
            resolve(r)
          })
          .catch(reject)
      })
    }
  })
}

const isNum = n => Number.isInteger(n)
const isObj = n => n === Object(n)
const isDimensionObj = n => isObj(n) && Object.keys(n).length === 1
