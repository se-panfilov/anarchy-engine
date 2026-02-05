import { AbstractWrapper, WrapperType } from '@hellpig/anarchy-engine/Abstract';
import { colorEntityToConfig } from '@hellpig/anarchy-engine/Color/Adapters';
import type { TColor, TColorParams, TColorWrapper } from '@hellpig/anarchy-engine/Color/Models';
import { isColorWrapper } from '@hellpig/anarchy-engine/Utils';
import type { ColorRepresentation } from 'three';
import { Color } from 'three';

export function ColorWrapper(color: TColorParams): TColorWrapper {
  const entity: TColor = new Color(isColorWrapper(color) ? color.entity : color);
  const result = Object.assign(AbstractWrapper(entity, WrapperType.Color), { entity, serialize: (): ColorRepresentation => colorEntityToConfig(result) });
  return result;
}
