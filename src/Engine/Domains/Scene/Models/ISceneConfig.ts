import type { ISceneParams } from '../Models';

export type ISceneConfig = ISceneParams &
  Readonly<{
    background?: string;
  }>;
