import type { ColorRepresentation } from 'three';
import { Color } from 'three';

import { AbstractWrapper, WrapperType } from '@/Abstract';
import { colorToConfig } from '@/Color/Adapters';
import type { TColor, TColorParams, TColorWrapper } from '@/Color/Models';
import { isColorWrapper } from '@/Utils';

export function ColorWrapper(color: TColorParams): TColorWrapper {
  const entity: TColor = new Color(isColorWrapper(color) ? color.entity : color);
  const result = Object.assign(AbstractWrapper(entity, WrapperType.Color), { entity, serialize: (): ColorRepresentation => colorToConfig(result) });
  return result;
}
