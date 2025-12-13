import type { ISceneParams } from '@/Engine/Domains/Scene/Models';

export type ISceneConfig = Omit<ISceneParams, 'background'> &
  Readonly<{
    background?: string;
  }>;
