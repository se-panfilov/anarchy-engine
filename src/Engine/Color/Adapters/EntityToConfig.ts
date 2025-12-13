import type { Color, ColorRepresentation } from 'three';

import type { TColorWrapper } from '@/Engine/Color/Models';

export function colorToConfig(entity: TColorWrapper): ColorRepresentation {
  return serializeColor(entity.entity);
}

export function serializeColor(color: Color): string {
  return `#${color.getHexString().toUpperCase()}`;
}
