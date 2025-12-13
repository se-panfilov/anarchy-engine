import type { IRotatableX } from './IRotatableX';
import type { IRotatableY } from './IRotatableY';
import type { IRotatableZ } from './IRotatableZ';
import type { IWithRotation } from './IWithRotation';

export type IRotatable = IWithRotation & IRotatableX & IRotatableY & IRotatableZ;
