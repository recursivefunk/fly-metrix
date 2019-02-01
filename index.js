
const createCounter = require('./lib/create-counter')

const FlyMetrix = function (namespace = 'FlyMetrix') {
  return Object.create({
    counter: (name = 'counter') => createCounter(name, namespace)
  })
}

module.exports = FlyMetrix
