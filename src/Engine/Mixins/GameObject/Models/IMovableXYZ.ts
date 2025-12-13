import type { IMovableX } from './IMovableX';
import type { IMovableY } from './IMovableY';
import type { IMovableZ } from './IMovableZ';
import type { IWithPosition } from './IWithPosition';

export type IMovableXYZ = IWithPosition & IMovableX & IMovableY & IMovableZ;
