import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';

export type TWithSceneGetterService = Readonly<{
  getScene: () => TSceneWrapper;
}>;
