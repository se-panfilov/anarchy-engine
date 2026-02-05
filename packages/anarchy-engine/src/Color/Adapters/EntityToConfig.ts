import type { TColorWrapper } from '@hellpig/anarchy-engine/Color/Models';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { Color, ColorRepresentation } from 'three';

export function colorEntityToConfig(entity: TColorWrapper): ColorRepresentation {
  return serializeColor(entity.entity);
}

export function serializeColor(color: Color): string {
  return `#${color.getHexString().toUpperCase()}`;
}

export function serializeColorWhenPossible(color: Color | undefined): string | undefined {
  if (isNotDefined(color)) return undefined;
  return serializeColor(color);
}
