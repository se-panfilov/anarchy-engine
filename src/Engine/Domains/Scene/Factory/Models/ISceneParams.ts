import { SceneTag } from '@Engine/Constants';

export type ISceneParams = Readonly<{
  name: string;
  tags: ReadonlyArray<SceneTag>;
}>;
