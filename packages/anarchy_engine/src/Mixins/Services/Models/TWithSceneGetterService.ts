import type { TSceneWrapper } from '@Engine/Scene';

export type TWithSceneGetterService = Readonly<{
  getScene: () => TSceneWrapper;
}>;
