import type { IWithRotation } from './IWithRotation';
import type { TRotatableX } from './TRotatableX';
import type { TRotatableY } from './TRotatableY';
import type { TRotatableZ } from './TRotatableZ';

export type IRotatable = IWithRotation & TRotatableX & TRotatableY & TRotatableZ;
