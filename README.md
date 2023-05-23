# Fly Metrix

![workflow](https://github.com/recursivefunk/fly-metrix/actions/workflows/ci.yml/badge.svg)

CloudWatch metrics wrapper. Not production ready.

```
export AWS_ACCESS_KEY_ID=your_key # Has appropriate IAM rights for putMetricData()
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_DEFAULT_REGION=us-east-1 # optional, defaults to us-east-1
```

### Counter

```javascript
const namespace = 'MyMetrics';
const FlyMetrix = require('fly-metrix');
const metrics = FlyMetrix(namespace);
const counter = metrics.Counter('the_things');

(async function () {
  counter.count(); // 0
  // ...
  counter.inc(); // 1
  // ...
  counter.inc(2); // 3
  await counter.report(); // Report 3 for 'MyMetrics/the_things'
  counter.count(); // 0
})();
```
