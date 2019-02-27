
const AWS = require('aws-sdk')
const env = require('good-env')
const createCounter = require('./lib/create-counter')
const createTimer = require('./lib/create-timer')
const region = env.get('AWS_DEFAULT_REGION', 'us-east-1')
const cloudwatch = new AWS.CloudWatch({ region })

const FlyMetrix = function (namespace = 'FlyMetrix') {

  // Ensure the required environment variables are set. Throw, if not.
  env.ensure(
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY'
  )

  return Object.create({
    Counter: (name = 'counter') => createCounter(name, namespace, cloudwatch),
    Timer: (name = 'timer') => createTimer(name, namespace, cloudwatch)
  })
}

module.exports = FlyMetrix
