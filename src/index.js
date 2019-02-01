
const createCounter = require('./lib/create-counter')
const createTimer = require('./lib/create-timer')

const FlyMetrix = function (namespace = 'FlyMetrix') {
  return Object.create({
    counter: (name = 'counter') => createCounter(name, namespace),
    timer: (name = 'timer') => createTimer(name, namespace)
  })
}

module.exports = FlyMetrix
