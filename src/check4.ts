/* eslint-disable */

type ISome = {
  some: string;
};

function getSome(): ISome {
  return {
    some: 'some'
  };
}

type IWithName = {
  name: string;
};

function withName<T extends ISome>(factory: T): T & IWithName {
  return {
    ...factory,
    name: 'name'
  };
}

type IWithCounter = {
  count: () => number;
};

function withCounter<T extends ISome>(factory: T): T & IWithCounter {
  return {
    ...factory,
    count: () => 0
  };
}

type IResult = ISome & IWithName & IWithCounter;
////////////////////////

type PipableFunction<P, T> = (a: P) => T;

type PipeResult<T, Fns extends any[]> = Fns extends [PipableFunction<T, infer U>, ...infer Rest] ? PipeResult<U, Rest> : T;

// function pipe<T, Fns extends PipableFunction<any, any>[]>(initial: T, ...fns: Fns): PipeResult<T, Fns> {
//   return fns.reduce((acc: T, fn) => fn(acc), initial) as PipeResult<T, Fns>;
// }

// function pipe<T>(initial: T, ...fns: Array<(arg: T) => T>): T {
//   return fns.reduce((acc: T, fn) => fn(acc), initial);
// }

type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [(...args: infer A) => infer B]
  ? [...Acc, (...args: A) => B]
  : F extends [(...args: infer A) => any, ...infer Tail]
  ? Tail extends [(arg: infer B) => any, ...any[]]
    ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
    : Acc
  : Acc;

type AnyFunc = (...arg: any) => any;

type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [...any[], (...arg: any) => infer R] ? R : Else;

function pipe<FirstFn extends AnyFunc, F extends AnyFunc[]>(arg: Parameters<FirstFn>[0], firstFn: FirstFn, ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>): LastFnReturnType<F, ReturnType<FirstFn>> {
  return (fns as AnyFunc[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}

// const result: IResult = pipe(getSome(), withName, withCounter);
const result: ISome & IWithName & IWithCounter = pipe(getSome(), withName, withCounter);

console.log(result);
