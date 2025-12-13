import type { TRotatableX } from './TRotatableX';
import type { TRotatableY } from './TRotatableY';
import type { TRotatableZ } from './TRotatableZ';
import type { IWithRotation } from './IWithRotation';

export type IRotatable = IWithRotation & TRotatableX & TRotatableY & TRotatableZ;
