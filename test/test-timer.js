
const test = require('tape')
const FlyMetrix = require('../src/index')

test('it times stuff', t => {
  const metrics = FlyMetrix('things')
  const timer = metrics.timer('timer')
  let duration

  timer.start()
  wait(100)
    .then(() => {
      const duration = timer.stop().duration
      t.equal(true, duration >= 100, 'timer ran for at least 100m')
      t.end()
    })
})

test('you can\'t stop a timer which has not been started', t => {
  const metrics = FlyMetrix('things')
  const timer = metrics.timer('timer')
  let duration

  t.throws(
    () => timer.stop(),
    'The timer has not been started',
    'stopping a timer which has not been started throws an error'
  )
  t.end()
})

const wait = n => new Promise(r => setTimeout(r, n))
