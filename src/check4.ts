// pipe
type Fn = (arg: any) => any;

type PipableFunction<A, B> = (a: A) => B;

type PipeResult<T, Fns extends any[]> = Fns extends [PipableFunction<T, infer U>, ...infer Rest] ? PipeResult<U, Rest> : T;

// function pipe<T, Fns extends PipableFunction<any, any>[]>(initial: T, ...fns: Fns): PipeResult<T, Fns> {
//   return fns.reduce((acc: T, fn) => fn(acc), initial) as PipeResult<T, Fns>;
// }

function pipe<T>(initial: T, ...fns: Array<(arg: T) => T>): T {
  return fns.reduce((acc: T, fn) => fn(acc), initial);
}
