import type { SceneTag } from '@/Engine/Domains/Scene';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IColor, ICubeTexture, ITexture } from '@/Engine/Wrappers';

export type ISceneParams = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}> &
  IWithReadonlyTags<SceneTag>;
