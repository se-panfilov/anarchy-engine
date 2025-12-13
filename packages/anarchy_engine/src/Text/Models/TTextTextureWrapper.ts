import type { TWrapper } from '@Engine/Abstract';
import type { TextType } from '@Engine/Text/Constants';
import type { TAbstractTextWrapper } from '@Engine/Text/Models/TAbstractTextWrapper';
import type { Mesh } from 'three';

import type { TTextCssProps } from './TTextCssProps';

export type TTextTextureWrapper<T extends Mesh> = TWrapper<T> &
  Readonly<{
    type: TextType;
    setText: (newText: string) => Promise<void>;
    getText: () => string;
    getPropsAsCss: () => Pick<TTextCssProps, 'fontSize' | 'fontFamily' | 'backgroundColor' | 'color'>;
  }> &
  TAbstractTextWrapper;
