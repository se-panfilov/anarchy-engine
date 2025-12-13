import { AbstractWrapper } from '@Engine/Domains/Abstract';
import { Color } from 'three';

import type { IColor, IColorParams, IColorWrapper } from './Models';
import { isColorWrapper } from '@/Engine/Utils';

export function ColorWrapper(color: IColorParams): IColorWrapper {
  const entity: IColor = new Color(isColorWrapper(color) ? color.entity : color);
  return { ...AbstractWrapper(entity), entity };
}
