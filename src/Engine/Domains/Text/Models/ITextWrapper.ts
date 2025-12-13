import type { Object3D } from 'three';

import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type ITextWrapper = Readonly<{
  setText: (text: string) => void;
  setFontSize: (fontSize: number) => void;
  setColor: (color: string) => void;
  setPosition: (position: IVector3Wrapper) => void;
  dispose: () => void;
  update: () => void;
  entity: Object3D;
}>;
