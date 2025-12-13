import type { Vector3 } from 'three';

// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
export type TReadonlyVector3 = Readonly<
  Pick<Vector3, 'x' | 'y' | 'z' | 'clone' | 'length' | 'lengthSq' | 'manhattanLength' | 'distanceTo' | 'distanceToSquared' | 'manhattanDistanceTo' | 'angleTo' | 'dot' | 'equals'>
>;
