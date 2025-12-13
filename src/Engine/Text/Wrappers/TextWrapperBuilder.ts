import { TextType } from '@/Engine/Text/Constants';
import type { ITextAnyWrapper, ITextParams } from '@/Engine/Text/Models';

import { Text2dWrapper } from './Text2dWrapper';
import { Text3dWrapper } from './Text3dWrapper';

export function buildTextWrapper(params: ITextParams): ITextAnyWrapper | never {
  if (params.type === TextType.Text3d) return Text3dWrapper(params);
  if (params.type === TextType.Text2d) return Text2dWrapper(params);
  throw new Error('Unsupported text type');
}
