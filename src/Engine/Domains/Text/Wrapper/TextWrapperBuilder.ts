import { TextType } from '@/Engine/Domains/Text/Constants';
import type { ITextAnyWrapper, ITextParams } from '@/Engine/Domains/Text/Models';

import { Text2dWrapper } from './Text2dWrapper';
import { Text3dWrapper } from './Text3dWrapper';

export function buildTextWrapper(params: ITextParams): ITextAnyWrapper | never {
  if (params.type === TextType.Text3d) return Text3dWrapper(params);
  if (params.type === TextType.Text2d) return Text2dWrapper(params);
  throw new Error('Unsupported text type');
}
