import type { ColorRepresentation } from 'three';

import type { TColorWrapper } from '@/Engine/Color/Models';

// TODO 15-0-0: validate result
export function colorToConfig(entity: TColorWrapper): ColorRepresentation {
  return entity.entity.toJSON();
}
