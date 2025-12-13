import Benchmark from 'benchmark';
import { LRUCache } from 'lru-cache';
import memoizee from 'memoizee';

const complexCalculation = (a, b) => {
  return a + b;
};
const memoizedCalculation = memoizee(complexCalculation, { max: 100, maxAge: 1000 });

const lruCache = new LRUCache({ max: 100 });

function lruCachedCalculation(a, b) {
  const key = `${a}-${b}`;
  if (lruCache.has(key)) {
    return lruCache.get(key);
  } else {
    const result = complexCalculation(a, b);
    lruCache.set(key, result);
    return result;
  }
}

const suite = new Benchmark.Suite();

suite
  .add('memoizee', function () {
    memoizedCalculation(1, 2);
    memoizedCalculation(3, 4);
    memoizedCalculation(5, 6);
    memoizedCalculation(1, 2);
    memoizedCalculation(3, 4);
    memoizedCalculation(5, 6);
  })
  .add('lru-cache', function () {
    lruCachedCalculation(1, 2);
    lruCachedCalculation(3, 4);
    lruCachedCalculation(5, 6);
    lruCachedCalculation(1, 2);
    lruCachedCalculation(3, 4);
    lruCachedCalculation(5, 6);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
