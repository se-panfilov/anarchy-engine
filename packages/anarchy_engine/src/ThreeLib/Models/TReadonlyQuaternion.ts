import type { Quaternion } from 'three';

// TODO Better to use Pick instead of Omit, but it is not working with ts-json-schema-generator
// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
// export type TReadonlyQuaternion = Readonly<Pick<Quaternion, 'x' | 'y' | 'z' | 'w' | 'clone' | 'equals' | 'dot' | 'toArray' | 'angleTo'>>;

// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
export type TReadonlyQuaternion = Readonly<
  Omit<
    Quaternion,
    | 'copy'
    | 'invert'
    | 'multiply'
    | 'multiplyQuaternions'
    | 'normalize'
    | 'premultiply'
    | 'set'
    | 'setFromAxisAngle'
    | 'setFromEuler'
    | 'setFromRotationMatrix'
    | 'setFromUnitVectors'
    | 'slerp'
    | 'slerpQuaternions'
  >
>;
