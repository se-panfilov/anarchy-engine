import type { TWithCoordW } from './TWithCoordW';
import type { TWithCoordX } from './TWithCoordX';
import type { TWithCoordY } from './TWithCoordY';
import type { TWithCoordZ } from './TWithCoordZ';

export type TWithCoordsXYZW = TWithCoordX & TWithCoordY & TWithCoordZ & TWithCoordW;
