import { AbstractWrapper, WrapperType } from '@Engine/Domains/Abstract';
import { Color } from 'three';

import { isColorWrapper } from '@/Engine/Utils';

import type { IColor, IColorParams, IColorWrapper } from './Models';

export function ColorWrapper(color: IColorParams): IColorWrapper {
  const entity: IColor = new Color(isColorWrapper(color) ? color.entity : color);
  return { ...AbstractWrapper(entity, WrapperType.Color), entity };
}
