const test = require('tape');
const FlyMetrix = require('../src/index');
// eslint-disable-next-line
const wait = (n) => new Promise((r) => setTimeout(r, n));

test('it times stuff', async (t) => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  timer.start();
  await wait(100);
  const duration = timer.stop().duration;
  t.equal(true, duration >= 100, 'timer ran for at least 100m');
  t.end();
});

test("you can't stop a timer which has not been started", (t) => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  t.throws(
    () => timer.stop(),
    'The timer has not been started',
    'stopping a timer which has not been started throws an error'
  );
  t.end();
});

test('it computes stats', (t) => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  timer.start();
  wait(100)
    .then(() => {
      timer.stop();
      timer.start();
      return wait(300);
    })
    .then(() => {
      timer.stop();
      const stats = timer.computeStats();
      t.equal(true, stats.Sum >= 400, 'sum is calculated');
      t.equal(2, stats.SampleCount, 'number of runs is correct');
      t.equal(stats.SampleCount, 2, 'sample count is correct');
      t.end();
      return;
    })
    .catch((err) => t.fail(err));
});
