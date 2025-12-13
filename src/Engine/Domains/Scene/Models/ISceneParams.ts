import type { SceneTag } from '@Engine/Domains/Scene';
import type { IColor, ICubeTexture, ITexture } from '@Engine/Wrappers';

import type { CommonTag } from '@/Engine/Domains/Abstract';

export type ISceneParams = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
  tags: ReadonlyArray<SceneTag | CommonTag | string>;
}>;
