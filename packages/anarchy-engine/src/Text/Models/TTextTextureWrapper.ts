import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TAbstractTextWrapper } from '@Anarchy/Engine/Text/Models/TAbstractTextWrapper';
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
