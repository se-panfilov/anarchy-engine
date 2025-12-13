import type { IWithPositionXYZ } from '@/Engine/Mixins/GameObject/Models/Position';

import type { IMovableX } from './IMovableX';
import type { IMovableY } from './IMovableY';
import type { IMovableZ } from './IMovableZ';

export type IMovableXYZ = IWithPositionXYZ & IMovableX & IMovableY & IMovableZ;
