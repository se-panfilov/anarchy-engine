import type { TSceneWrapper } from '@Anarchy/Engine/Scene';

export type TWithSceneGetterService = Readonly<{
  getScene: () => TSceneWrapper;
}>;
