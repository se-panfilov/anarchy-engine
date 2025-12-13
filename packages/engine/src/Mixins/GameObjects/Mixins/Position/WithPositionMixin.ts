import type { TWithPosition, TWithPositionProperty } from '@/Engine/Mixins/GameObjects/Models';
import { isEntityWith2dPosition, isEntityWith3dPosition, isEntityWith4dPosition } from '@/Engine/Utils';

import { withPosition2dMixin } from './WithPosition2dMixin';
import { withPosition3dMixin } from './WithPosition3dMixin';
import { withPosition4dMixin } from './WithPosition4dMixin';

export function withPositionMixin(entity: TWithPositionProperty): TWithPosition | never {
  if (isEntityWith3dPosition(entity)) return withPosition3dMixin(entity);
  if (isEntityWith2dPosition(entity)) return withPosition2dMixin(entity);
  if (isEntityWith4dPosition(entity)) return withPosition4dMixin(entity);
  throw new Error('Unknown position type');
}
