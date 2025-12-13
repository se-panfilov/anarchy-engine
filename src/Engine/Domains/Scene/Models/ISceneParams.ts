import type { SceneTag } from '@Engine/Domains/Scene/Constants';

export type ISceneParams = Readonly<{
  name: string;
  tags: ReadonlyArray<SceneTag>;
}>;
