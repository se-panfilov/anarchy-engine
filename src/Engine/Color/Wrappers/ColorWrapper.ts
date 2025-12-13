import { Color } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TColor, TColorParams, TColorWrapper } from '@/Engine/Color/Models';
import { isColorWrapper } from '@/Engine/Utils';

export function ColorWrapper(color: TColorParams): TColorWrapper {
  const entity: TColor = new Color(isColorWrapper(color) ? color.entity : color);
  entity;
  return { ...AbstractWrapper(entity, WrapperType.Color), entity };
}
