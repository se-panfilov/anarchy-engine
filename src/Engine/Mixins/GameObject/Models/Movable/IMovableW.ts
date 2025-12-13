import type { IWithPosition4d } from '@/Engine/Mixins/GameObject/Models/Position';

import type { ICoordinateAccessorW } from './ICoordinateAccessor';

export type IMovable4dW = IWithPosition4d & ICoordinateAccessorW;
