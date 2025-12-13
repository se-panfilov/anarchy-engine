import type { SceneTag } from '@Engine/Domains/Scene';

export type ISceneParams = Readonly<{
  name: string;
  tags: ReadonlyArray<SceneTag>;
}>;
