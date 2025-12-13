export type TMergeBuilder<T> = {
  with: <B extends object>(next: B) => TMergeBuilder<T & B>;
  done: () => T;
};

// This is a type-safe equivalent of Object.assign (which can lose type information with more than 2-3 arguments).
// Avoid usage with getters/setters (they will become regular properties).
export function mergeChain<A extends object>(initial: A): TMergeBuilder<A> {
  return {
    with<B extends object>(next: B): TMergeBuilder<A & B> {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(initial, next);
      return mergeChain(initial as A & B);
    },
    done(): A {
      return initial;
    }
  };
}

// type TMergeTupleToIntersection<T extends readonly object[]> = T extends [infer First extends object, ...infer Rest extends object[]] ? First & TMergeTupleToIntersection<Rest> : unknown;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TMergeTupleToIntersection<T extends readonly object[]> = T extends [infer First extends object, ...infer Rest extends object[]] ? First & TMergeTupleToIntersection<Rest> : {};

// This is a type-safe equivalent of Object.assign (which can lose type information with more than 2-3 arguments).
// Avoid usage with getters/setters (they will become regular properties).
export function mergeAll<T extends readonly [object, ...object[]]>(...args: T): TMergeTupleToIntersection<T> {
  const target = args[0];
  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 1; i < args.length; i++) {
    // eslint-disable-next-line functional/immutable-data
    Object.assign(target, args[i]);
  }
  return target as TMergeTupleToIntersection<T>;
}
