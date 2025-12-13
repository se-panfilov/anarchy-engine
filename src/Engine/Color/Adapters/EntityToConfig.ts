import type { ColorRepresentation } from 'three';

import type { TColorWrapper } from '@/Engine/Color/Models';

export function colorToConfig(entity: TColorWrapper): ColorRepresentation {
  return `#${entity.entity.getHexString()}`;
}
