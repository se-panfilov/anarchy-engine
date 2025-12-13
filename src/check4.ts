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

function pipe<T, Fns extends PipableFunction<any, any>[]>(initial: T, ...fns: Fns): PipeResult<T, Fns> {
  return fns.reduce((acc: T, fn) => fn(acc), initial) as PipeResult<T, Fns>;
}

// function pipe<T>(initial: T, ...fns: Array<(arg: T) => T>): T {
//   return fns.reduce((acc: T, fn) => fn(acc), initial);
// }

const result: IResult = pipe(getSome(), withName, withCounter);

console.log(result);
