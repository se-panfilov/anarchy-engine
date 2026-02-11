import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TAbstractTextWrapper } from '@hellpig/anarchy-engine/Text/Models';
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
