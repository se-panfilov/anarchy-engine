import type { EulerOrder } from 'three/src/math/Euler';

export type IEulerParams = Readonly<{
  x?: number;
  y?: number;
  z?: number;
  order?: EulerOrder;
}>;
