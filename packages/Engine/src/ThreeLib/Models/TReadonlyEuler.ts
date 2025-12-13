import type { Euler } from 'three';

// TODO Better to use Pick instead of Omit, but it is not working with ts-json-schema-generator
// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
// export type TReadonlyEuler = Readonly<Pick<Euler, 'x' | 'y' | 'z' | 'order' | 'clone' | 'equals' | 'toArray'>>;

// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
export type TReadonlyEuler = Readonly<Omit<Euler, 'set' | 'copy' | 'reorder' | 'setFromQuaternion' | 'setFromRotationMatrix'>>;
