import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import { colorEntityToConfig } from '@Anarchy/Engine/Color/Adapters';
import type { TColor, TColorParams, TColorWrapper } from '@Anarchy/Engine/Color/Models';
import { isColorWrapper } from '@Anarchy/Engine/Utils';
import type { ColorRepresentation } from 'three';
import { Color } from 'three';

export function ColorWrapper(color: TColorParams): TColorWrapper {
  const entity: TColor = new Color(isColorWrapper(color) ? color.entity : color);
  const result = Object.assign(AbstractWrapper(entity, WrapperType.Color), { entity, serialize: (): ColorRepresentation => colorEntityToConfig(result) });
  return result;
}
