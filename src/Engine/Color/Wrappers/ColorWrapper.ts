import type { ColorRepresentation } from 'three';
import { Color } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { colorToConfig } from '@/Engine/Color/Adapters';
import type { TColor, TColorParams, TColorWrapper } from '@/Engine/Color/Models';
import { isColorWrapper } from '@/Engine/Utils';

export function ColorWrapper(color: TColorParams): TColorWrapper {
  const entity: TColor = new Color(isColorWrapper(color) ? color.entity : color);
  const result = Object.assign(AbstractWrapper(entity, WrapperType.Color), { entity, serialize: (): ColorRepresentation => colorToConfig(result) });
  return result;
}
