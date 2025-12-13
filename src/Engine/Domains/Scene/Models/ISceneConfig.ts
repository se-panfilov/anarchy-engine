import type { ISceneParams } from '../Models';

export type ISceneConfig = Omit<ISceneParams, 'background'> &
  Readonly<{
    background?: string;
  }>;
