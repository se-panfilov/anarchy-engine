import { Color } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IColor, IColorParams, IColorWrapper } from '@/Engine/Color/Models';
import { isColorWrapper } from '@/Engine/Utils';

export function ColorWrapper(color: IColorParams): IColorWrapper {
  const entity: IColor = new Color(isColorWrapper(color) ? color.entity : color);
  return { ...AbstractWrapper(entity, WrapperType.Color), entity };
}
