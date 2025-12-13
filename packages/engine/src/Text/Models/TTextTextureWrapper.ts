import type { Mesh } from 'three';

import type { TWrapper } from '@/Abstract';
import type { TextType } from '@/Text/Constants';
import type { TAbstractTextWrapper } from '@/Text/Models/TAbstractTextWrapper';

import type { TTextCssProps } from './TTextCssProps';

export type TTextTextureWrapper<T extends Mesh> = TWrapper<T> &
  Readonly<{
    type: TextType;
    setText: (newText: string) => Promise<void>;
    getText: () => string;
    getPropsAsCss: () => Pick<TTextCssProps, 'fontSize' | 'fontFamily' | 'backgroundColor' | 'color'>;
  }> &
  TAbstractTextWrapper;
