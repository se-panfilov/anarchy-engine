import type { SceneTag } from '@Engine/Domains/Scene';
import type { IColor, ITexture, ICubeTexture } from '@Engine/Wrappers';

export type ISceneParams = Readonly<{
  name: string;
  background: string | IColor | ITexture | ICubeTexture;
  tags: ReadonlyArray<SceneTag>;
}>;
