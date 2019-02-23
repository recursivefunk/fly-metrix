
const createCounter = require('./lib/create-counter')
const createTimer = require('./lib/create-timer')

const FlyMetrix = function (namespace = 'FlyMetrix') {
  return Object.create({
    Counter: (name = 'counter') => createCounter(name, namespace),
    Timer: (name = 'timer') => createTimer(name, namespace)
  })
}

module.exports = FlyMetrix
