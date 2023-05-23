const FlyMetrix = require('../../src/index');
// eslint-disable-next-line
const wait = (n) => new Promise((r) => setTimeout(r, n));

it('it times stuff', async () => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  timer.start();
  await wait(100);
  const duration = timer.stop().duration;
  expect(duration >= 100).toBe(true);
});

it("you can't stop a timer which has not been started", () => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  expect(
    () => timer.stop(),
  ).toThrow('The timer has not been started');
});

it('it computes stats', async () => {
  const metrics = FlyMetrix('things');
  const timer = metrics.Timer('timer');

  timer.start();
  await wait(100);
  timer.stop();
  timer.start();
  await wait(300);
  timer.stop();
  const stats = timer.computeStats();
  expect(stats.Sum >= 400).toBe(true);
  expect(stats.SampleCount).toBe(2);
});
