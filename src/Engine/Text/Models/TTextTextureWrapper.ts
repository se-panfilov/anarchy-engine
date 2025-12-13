import type { Mesh } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TextType } from '@/Engine/Text/Constants';
import type { TAbstractTextWrapper } from '@/Engine/Text/Models/TAbstractTextWrapper';

export type TTextTextureWrapper<T extends Mesh> = TWrapper<T> &
  Readonly<{
    type: TextType;
    setText: (newText: string) => Promise<void>;
    getText: () => string;
  }> &
  TAbstractTextWrapper;
