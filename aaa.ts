type Foo1 = { name: number };
type Foo2 = { name: string };

const foo1: Foo1 = { name: 1 };
const foo2: Foo2 = { name: 'foo2' };

const enum BarEnum {
  Bar1 = 'Bar1',
  Bar2 = 'Bar2'
}

type Bar1 = Foo1 & { bar: BarEnum.Bar1 };
type Bar2 = Foo2 & { bar: BarEnum.Bar2 };

type Foo = Foo1 | Foo2;
type Bar = Bar1 | Bar2;

function isFoo1(foo: Foo): foo is Foo1 {
  return (foo as Foo1).name !== undefined && typeof (foo as Foo1).name === 'number';
}

function fooBar(foo: Foo1): Bar1;
function fooBar(foo: Foo2): Bar2;
function fooBar(foo: Foo): Bar {
  if (isFoo1(foo)) return { ...foo, bar: BarEnum.Bar1 };
  if (!isFoo1(foo)) return { ...foo, bar: BarEnum.Bar2 };
  throw new Error('Unsupported foo');
}

const bar1: Bar1 = fooBar(foo1);
const bar2: Bar2 = fooBar(foo2);
const bar11 = fooBar(foo1);
const bar22 = fooBar(foo2);

console.log(bar1);
console.log(bar2);
console.log(bar11);
console.log(bar22);
