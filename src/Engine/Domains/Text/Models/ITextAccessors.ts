import type { Color } from 'three';

import type { IMovable, IRotatable } from '@/Engine/Mixins';

export type ITextAccessors = IMovable &
  IRotatable &
  Readonly<{
    setText: (text: string) => void;
    setFontSize: (fontSize: number) => void;
    setColor: (color: string | number | Color) => void;
    dispose: () => void;
    update: () => void;
  }>;
