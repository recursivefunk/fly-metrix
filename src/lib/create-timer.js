
const cuid = require('cuid')

module.exports = (name, namespace) => {
  const uid = cuid()
  let run = 0
  let isRunning = false
  let startTime

  return Object.freeze({
    start () {
      if (isRunning) throw Error(`The timer was already started at ${startTime}`)
      startTime = Date.now()
      isRunning = true
    },

    stop () {
      if (!isRunning) throw Error(`The timer has not been started`)
      const start = startTime
      const end = Date.now()
      const duration = end - start
      startTime = null
      isRunning = false
      return { start, end, duration }
    },

    id: () => uid
  })
}
