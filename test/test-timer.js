
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

test('it computes stats', t => {
  const metrics = FlyMetrix('things')
  const timer = metrics.timer('timer')

  timer.start()
  wait(100)
    .then(() => {
      timer.stop()
      timer.start()
      return wait(300)
    })
    .then(() => {
      timer.stop()
      const stats = timer.computeStats()
      t.equal(
        true,
        stats.Sum >= 400,
        'sum is calculated'
      )
      t.equal(
        2,
        stats.SampleCount,
        'number of runs is correct'
      )
      t.equal(stats.SampleCount, 2, 'sample count is correct')
      t.end()
    })
})

const wait = n => new Promise(r => setTimeout(r, n))
