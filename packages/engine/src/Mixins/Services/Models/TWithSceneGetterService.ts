import type { TSceneWrapper } from '@/Scene';

export type TWithSceneGetterService = Readonly<{
  getScene: () => TSceneWrapper;
}>;
