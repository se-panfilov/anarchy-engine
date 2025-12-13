import type { TWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { TCoordinateAccessorW } from './TCoordinateAccessor';

export type TMovable4dW = TWithPosition4d & TCoordinateAccessorW;
