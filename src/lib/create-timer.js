const { performance } = require('perf_hooks');
const { randomUUID: uuid } = require('crypto');

// eslint-disable-next-line no-unused-vars
module.exports = ({ name, cloudwatch }) => {
  const uid = uuid();
  let isRunning = false;
  let startTime;
  const runs = [];

  return Object.freeze({
    /**
     * Start a new timer if one is not currently running
     *
     */
    start() {
      if (isRunning)
        throw Error(`The timer was already started at ${startTime}`);
      startTime = performance.now();
      isRunning = true;
    },

    /**
     * Stop the currently running timer if one is running
     *
     */
    stop() {
      if (!isRunning) throw Error(`The timer has not been started`);
      const start = startTime;
      const end = performance.now();
      const duration = end - start;
      startTime = null;
      isRunning = false;
      runs.push(duration);
      return { start, end, duration };
    },

    computeStats() {
      return {
        Minimum: Math.min(...runs),
        Maxiumum: Math.max(...runs),
        Sum: runs.reduce((a, b) => a + b, 0),
        SampleCount: runs.length,
      };
    },

    id: () => uid,

    report: () =>
      new Promise((resolve, reject) => {
        const stats = this.computeStats();
        cloudwatch.putMetricData(stats).then(resolve).catch(reject);
      }),
  });
};
