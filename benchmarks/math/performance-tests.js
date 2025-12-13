/* eslint-disable @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-argument,no-undef,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
import Benchmark from 'benchmark';
import Big from 'big.js';
import BigNumber from 'bignumber.js';
import Decimal from 'decimal.js';
import { all, create } from 'mathjs';
import { glMatrix, vec3 } from 'gl-matrix';

//Install: npm install benchmark big.js mathjs bignumber.js decimal.js gl-matrix

const math = create(all);

const PI_STR = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
const PI_BIG = new Big(PI_STR);
const PI_BIGNUMBER = new BigNumber(PI_STR);
const PI_DECIMAL = new Decimal(PI_STR);

function degToRadBig(degrees) {
  return new Big(degrees).times(PI_BIG).div(180);
}

function degToRadBigNumber(degrees) {
  return new BigNumber(degrees).multipliedBy(PI_BIGNUMBER).dividedBy(180);
}

function degToRadDecimal(degrees) {
  return new Decimal(degrees).times(PI_DECIMAL).div(180);
}

function cosMath(value) {
  return new Big(math.cos(math.bignumber(value.toString())));
}

function sinMath(value) {
  return new Big(math.sin(math.bignumber(value.toString())));
}

function cosNativeBig(value) {
  return new Big(Math.cos(value.toNumber()));
}

function sinNativeBig(value) {
  return new Big(Math.sin(value.toNumber()));
}

function cosBignumberMath(value) {
  return new BigNumber(math.cos(math.bignumber(value.toString())));
}

function sinBignumberMath(value) {
  return new BigNumber(math.sin(math.bignumber(value.toString())));
}

function cosNativeBignumber(value) {
  return new BigNumber(Math.cos(value.toNumber()));
}

function sinNativeBignumber(value) {
  return new BigNumber(Math.sin(value.toNumber()));
}

function cosDecimalMath(value) {
  return new Decimal(math.cos(math.bignumber(value.toString())));
}

function sinDecimalMath(value) {
  return new Decimal(math.sin(math.bignumber(value.toString())));
}

function cosNativeDecimal(value) {
  return new Decimal(Math.cos(value.toNumber()));
}

function sinNativeDecimal(value) {
  return new Decimal(Math.sin(value.toNumber()));
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function sinGlMatrix(degrees) {
  const rad = degToRad(degrees);
  return Math.sin(rad);
}

function cosGlMatrix(degrees) {
  const rad = degToRad(degrees);
  return Math.cos(rad);
}

function pushByAzimuthBigGlMatrix(azimuthDeg, elevationDeg, force) {
  const azimuth = new Big(degToRad(azimuthDeg));
  const elevation = new Big(degToRad(elevationDeg));
  const forceDecimal = new Big(force);

  const x = forceDecimal.times(new Big(cosGlMatrix(elevation))).times(new Big(cosGlMatrix(azimuth)));
  const y = forceDecimal.times(new Big(cosGlMatrix(elevation))).times(new Big(sinGlMatrix(azimuth)));
  const z = forceDecimal.times(new Big(sinGlMatrix(elevation)));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthBignumberGlMatrix(azimuthDeg, elevationDeg, force) {
  const azimuth = new BigNumber(degToRad(azimuthDeg));
  const elevation = new BigNumber(degToRad(elevationDeg));
  const forceDecimal = new BigNumber(force);

  const x = forceDecimal.multipliedBy(new BigNumber(cosGlMatrix(elevation))).multipliedBy(new BigNumber(cosGlMatrix(azimuth)));
  const y = forceDecimal.multipliedBy(new BigNumber(cosGlMatrix(elevation))).multipliedBy(new BigNumber(sinGlMatrix(azimuth)));
  const z = forceDecimal.multipliedBy(new BigNumber(sinGlMatrix(elevation)));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthDecimalGlMatrix(azimuthDeg, elevationDeg, force) {
  const azimuth = new Decimal(degToRad(azimuthDeg));
  const elevation = new Decimal(degToRad(elevationDeg));
  const forceDecimal = new Decimal(force);

  const x = forceDecimal.times(new Decimal(cosGlMatrix(elevation))).times(new Decimal(cosGlMatrix(azimuth)));
  const y = forceDecimal.times(new Decimal(cosGlMatrix(elevation))).times(new Decimal(sinGlMatrix(azimuth)));
  const z = forceDecimal.times(new Decimal(sinGlMatrix(elevation)));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthGlMatrix(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRad(azimuthDeg);
  const elevation = degToRad(elevationDeg);
  const x = force * cosGlMatrix(elevation) * cosGlMatrix(azimuth);
  const y = force * cosGlMatrix(elevation) * sinGlMatrix(azimuth);
  const z = force * sinGlMatrix(elevation);

  return { x, y, z };
}

function pushByAzimuthBigMath(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadBig(azimuthDeg);
  const elevation = degToRadBig(elevationDeg);
  const forceDecimal = new Big(force);

  const x = forceDecimal.times(cosMath(elevation)).times(cosMath(azimuth));
  const y = forceDecimal.times(cosMath(elevation)).times(sinMath(azimuth));
  const z = forceDecimal.times(sinMath(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthBigNative(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadBig(azimuthDeg);
  const elevation = degToRadBig(elevationDeg);
  const forceDecimal = new Big(force);

  const x = forceDecimal.times(cosNativeBig(elevation)).times(cosNativeBig(azimuth));
  const y = forceDecimal.times(cosNativeBig(elevation)).times(sinNativeBig(azimuth));
  const z = forceDecimal.times(sinNativeBig(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthBignumberMath(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadBigNumber(azimuthDeg);
  const elevation = degToRadBigNumber(elevationDeg);
  const forceDecimal = new BigNumber(force);

  const x = forceDecimal.multipliedBy(cosBignumberMath(elevation)).multipliedBy(cosBignumberMath(azimuth));
  const y = forceDecimal.multipliedBy(cosBignumberMath(elevation)).multipliedBy(sinBignumberMath(azimuth));
  const z = forceDecimal.multipliedBy(sinBignumberMath(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthBignumberNative(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadBigNumber(azimuthDeg);
  const elevation = degToRadBigNumber(elevationDeg);
  const forceDecimal = new BigNumber(force);

  const x = forceDecimal.multipliedBy(cosNativeBignumber(elevation)).multipliedBy(cosNativeBignumber(azimuth));
  const y = forceDecimal.multipliedBy(cosNativeBignumber(elevation)).multipliedBy(sinNativeBignumber(azimuth));
  const z = forceDecimal.multipliedBy(sinNativeBignumber(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthDecimalMath(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadDecimal(azimuthDeg);
  const elevation = degToRadDecimal(elevationDeg);
  const forceDecimal = new Decimal(force);

  const x = forceDecimal.times(cosDecimalMath(elevation)).times(cosDecimalMath(azimuth));
  const y = forceDecimal.times(cosDecimalMath(elevation)).times(sinDecimalMath(azimuth));
  const z = forceDecimal.times(sinDecimalMath(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

function pushByAzimuthDecimalNative(azimuthDeg, elevationDeg, force) {
  const azimuth = degToRadDecimal(azimuthDeg);
  const elevation = degToRadDecimal(elevationDeg);
  const forceDecimal = new Decimal(force);

  const x = forceDecimal.times(cosNativeDecimal(elevation)).times(cosNativeDecimal(azimuth));
  const y = forceDecimal.times(cosNativeDecimal(elevation)).times(sinNativeDecimal(azimuth));
  const z = forceDecimal.times(sinNativeDecimal(elevation));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

const suite = new Benchmark.Suite();

let bigOnce = true;
let bigOnceMath = true;
let bignumOnce = true;
let bigOnceGL = true;
let bignumOnceM = true;
let bignumOnceGL = true;
let decimalOnce = true;
let decimalOnceM = true;
let decimalOnceGL = true;
let glOnce = true;

suite
  .add('Big.js + Math.js', () => {
    const { x } = pushByAzimuthBigMath(90, 0, 1);
    if (bigOnceMath) {
      console.log('Big.js + Math.js', x);
      bigOnceMath = false;
    }
  })
  .add('Big.js + gl-matrix', () => {
    const { x } = pushByAzimuthBigGlMatrix(90, 45, 1);
    if (bigOnceGL) {
      console.log('Big.js + gl-matrix', x);
      bigOnceGL = false;
    }
  })
  .add('Big.js + Native', () => {
    const { x } = pushByAzimuthBigNative(90, 0, 1);
    if (bigOnce) {
      console.log('Big.js + Native', x);
      bigOnce = false;
    }
  })
  .add('Bignumber.js + Math.js', () => {
    const { x } = pushByAzimuthBignumberMath(90, 0, 1);
    if (bignumOnceM) {
      console.log('Bignumber.js + Math.js', x);
      bignumOnceM = false;
    }
  })
  .add('Bignumber.js + gl-matrix', () => {
    const { x } = pushByAzimuthBignumberGlMatrix(90, 45, 1);
    if (bignumOnceGL) {
      console.log('Bignumber.js + gl-matrix', x);
      bignumOnceGL = false;
    }
  })
  .add('Bignumber.js + Native', () => {
    const { x } = pushByAzimuthBignumberNative(90, 0, 1);
    if (bignumOnce) {
      console.log('Bignumber.js + Native', x);
      bignumOnce = false;
    }
  })
  .add('Decimal.js + Math.js', () => {
    const { x } = pushByAzimuthDecimalMath(90, 0, 1);
    if (decimalOnceM) {
      console.log('Decimal.js + Math.js', x);
      decimalOnceM = false;
    }
  })
  .add('Decimal.js + gl-matrix', () => {
    const { x } = pushByAzimuthDecimalGlMatrix(90, 45, 1);
    if (decimalOnceGL) {
      console.log('Decimal.js + gl-matrix', x);
      decimalOnceGL = false;
    }
  })
  .add('Decimal.js + Native', () => {
    const { x } = pushByAzimuthDecimalNative(90, 0, 1);
    if (decimalOnce) {
      console.log('Decimal.js + Native', x);
      decimalOnce = false;
    }
  })
  // .add('Only gl-matrix', () => {
  //   const { x } = pushByAzimuthGlMatrix(90, 45, 1);
  //   if (glOnce) {
  //     console.log('Only gl-matrix', x);
  //     glOnce = false
  //   }
  // })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
