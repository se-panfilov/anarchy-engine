import type { TRotatableW } from './TRotatableW';
import type { TRotatableX } from './TRotatableX';
import type { TRotatableY } from './TRotatableY';
import type { TRotatableZ } from './TRotatableZ';

export type TQuaternionRotatable = TRotatableX & TRotatableY & TRotatableZ & TRotatableW;
