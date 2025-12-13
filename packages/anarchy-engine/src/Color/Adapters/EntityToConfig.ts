import type { TColorWrapper } from '@Anarchy/Engine/Color/Models';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { Color, ColorRepresentation } from 'three';

export function colorToConfig(entity: TColorWrapper): ColorRepresentation {
  return serializeColor(entity.entity);
}

export function serializeColor(color: Color): string {
  return `#${color.getHexString().toUpperCase()}`;
}

export function serializeColorWhenPossible(color: Color | undefined): string | undefined {
  if (isNotDefined(color)) return undefined;
  return serializeColor(color);
}
