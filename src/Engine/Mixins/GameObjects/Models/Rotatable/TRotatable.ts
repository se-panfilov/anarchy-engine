import type { TRotatableX } from './TRotatableX';
import type { TRotatableY } from './TRotatableY';
import type { TRotatableZ } from './TRotatableZ';
import type { TWithRotation } from './TWithRotation';

export type TRotatable = TWithRotation & TRotatableX & TRotatableY & TRotatableZ;
