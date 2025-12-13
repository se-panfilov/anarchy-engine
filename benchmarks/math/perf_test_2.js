import Benchmark from 'benchmark';
import Big from 'big.js';
import BigNumber from 'bignumber.js';
import Decimal from 'decimal.js';
import { create, all } from 'mathjs';
import { glMatrix } from 'gl-matrix';

const math = create(all);

const PI_BIG = new Big(Math.PI);
const PI_BIGNUMBER = new BigNumber(Math.PI);
const PI_DECIMAL = new Decimal(Math.PI);

function degToRadBig(degrees) {
  return new Big(degrees).times(PI_BIG).div(180);
}

function degToRadBigNumber(degrees) {
  return new BigNumber(degrees).multipliedBy(PI_BIGNUMBER).dividedBy(180);
}

function degToRadDecimal(degrees) {
  return new Decimal(degrees).times(PI_DECIMAL).div(180);
}

function sinMathJs(value) {
  return new Big(math.sin(math.bignumber(value.toString())));
}

function cosMathJs(value) {
  return new Big(math.cos(math.bignumber(value.toString())));
}

function sinMathJsBignumber(value) {
  return new BigNumber(math.sin(math.bignumber(value.toString())));
}

function cosMathJsBignumber(value) {
  return new BigNumber(math.cos(math.bignumber(value.toString())));
}

function sinMathJsDecimal(value) {
  return new Decimal(math.sin(math.bignumber(value.toString())));
}

function cosMathJsDecimal(value) {
  return new Decimal(math.cos(math.bignumber(value.toString())));
}

function sinGlMatrix(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new Big(Math.sin(rad));
}

function cosGlMatrix(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new Big(Math.cos(rad));
}

function sinGlMatrixBignumber(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new BigNumber(Math.sin(rad));
}

function cosGlMatrixBignumber(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new BigNumber(Math.cos(rad));
}

function sinGlMatrixDecimal(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new Decimal(Math.sin(rad));
}

function cosGlMatrixDecimal(value) {
  const rad = glMatrix.toRadian(value.toNumber());
  return new Decimal(Math.cos(rad));
}

function bigJsOperationsMathJs() {
  const a = new Big(1.1);
  const b = new Big(2.2);
  const c = new Big(3.3);

  const result = a.times(b).div(c).pow(2).toNumber();
  const sinValue = sinMathJs(new Big(result));
  const cosValue = cosMathJs(new Big(result));

  return { sin: sinValue, cos: cosValue };
}

function bigNumberOperationsMathJs() {
  const a = new BigNumber(1.1);
  const b = new BigNumber(2.2);
  const c = new BigNumber(3.3);

  const result = a.multipliedBy(b).dividedBy(c).pow(2).toNumber();
  const sinValue = sinMathJsBignumber(new BigNumber(result));
  const cosValue = cosMathJsBignumber(new BigNumber(result));

  return { sin: sinValue, cos: cosValue };
}

function decimalOperationsMathJs() {
  const a = new Decimal(1.1);
  const b = new Decimal(2.2);
  const c = new Decimal(3.3);

  const result = a.times(b).div(c).pow(2).toNumber();
  const sinValue = sinMathJsDecimal(new Decimal(result));
  const cosValue = cosMathJsDecimal(new Decimal(result));

  return { sin: sinValue, cos: cosValue };
}

function bigJsOperationsGlMatrix() {
  const a = new Big(1.1);
  const b = new Big(2.2);
  const c = new Big(3.3);

  const result = a.times(b).div(c).pow(2).toNumber();
  const sinValue = sinGlMatrix(new Big(result));
  const cosValue = cosGlMatrix(new Big(result));

  return { sin: sinValue, cos: cosValue };
}

function bigNumberOperationsGlMatrix() {
  const a = new BigNumber(1.1);
  const b = new BigNumber(2.2);
  const c = new BigNumber(3.3);

  const result = a.multipliedBy(b).dividedBy(c).pow(2).toNumber();
  const sinValue = sinGlMatrixBignumber(new BigNumber(result));
  const cosValue = cosGlMatrixBignumber(new BigNumber(result));

  return { sin: sinValue, cos: cosValue };
}

function decimalOperationsGlMatrix() {
  const a = new Decimal(1.1);
  const b = new Decimal(2.2);
  const c = new Decimal(3.3);

  const result = a.times(b).div(c).pow(2).toNumber();
  const sinValue = sinGlMatrixDecimal(new Decimal(result));
  const cosValue = cosGlMatrixDecimal(new Decimal(result));

  return { sin: sinValue, cos: cosValue };
}

const suite = new Benchmark.Suite();

suite
  .add('Big.js + math.js', () => {
    bigJsOperationsMathJs();
  })
  .add('Bignumber.js + math.js', () => {
    bigNumberOperationsMathJs();
  })
  .add('Decimal.js + math.js', () => {
    decimalOperationsMathJs();
  })
  .add('Big.js + gl-matrix', () => {
    bigJsOperationsGlMatrix();
  })
  .add('Bignumber.js + gl-matrix', () => {
    bigNumberOperationsGlMatrix();
  })
  .add('Decimal.js + gl-matrix', () => {
    decimalOperationsGlMatrix();
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
