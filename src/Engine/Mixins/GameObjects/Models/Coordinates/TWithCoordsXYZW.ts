import type { IWithCoordW } from './IWithCoordW';
import type { IWithCoordX } from './IWithCoordX';
import type { IWithCoordY } from './IWithCoordY';
import type { IWithCoordZ } from './IWithCoordZ';

export type TWithCoordsXYZW = IWithCoordX & IWithCoordY & IWithCoordZ & IWithCoordW;
