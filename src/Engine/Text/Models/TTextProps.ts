import type { Vector2 } from 'three';

import type { TWithNameOptional } from '@/Engine/Mixins';
import type { TextType } from '@/Engine/Text/Constants';

import type { TTextCssProps } from './TTextCssProps';

export type TTextProps = Readonly<{
  text: string;
  type: TextType;
  cssProps?: TTextCssProps;
  center?: Vector2;
  elementType?: string;
}> &
  TWithNameOptional;
