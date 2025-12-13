import type { EulerOrder } from 'three';

export type IEuler3dConfig = Readonly<{
  x?: number;
  y?: number;
  z?: number;
  order?: EulerOrder;
}>;
